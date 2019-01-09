var currentDocItem = null;
var decimalPlaces = 1;
var incrementBy = 0.5;
var parts = 1/incrementBy;

$(function(){
	$(".addIcon, .aboutIcon").hover(function (){ currentDocItem = $(this).parent(".listItem"); });
	$(".listItem .addIcon").click(function (){actionDownload();});
	$(".listItem .aboutIcon").click(function (){actionAbout();});
	
	$(".button, button:not(h1 button)").button();
	if($('#leftCol').width() < 700){
		$('#templateContent').addClass('thinWindow');
	}
	if($('#leftCol').find('div:first').prop('id') == 'socialIcons'){
		$('#leftCol').find('div:first').addClass('floatRight');
	}
	if(getRating($('#yourRating')) > 0){
		$('#currentUserRating').css('visibility', 'visible');
	}
	
	// temp fix while data is pointing to male.gif
	$("div.profileImage").each(function (){
		var styleAttr = $(this).attr("style");
		if(styleAttr.indexOf("male.gif") > 0){
			$(this).attr("style",styleAttr.replace("male.gif","profile_male.png"));
		}
	});

	$("ul#socialIcons li").click(function (){personSocialLink($(this));});
	if($("ul#socialIcons").children("li").length === 0){$("#socialFollow").remove();}
	if(window == window.top && document.location.href.indexOf("tclass=popup") > 0){$("body").removeClass("popup");}
	if($("#rightCol").children().length === 0){$("#rightCol").hide();$("#leftCol").css({"width":"auto", "float":"none"});}
	$("h1 button").click(function (){
		var id = $(this).closest('div.detailHeader').attr("id").split("_")[1];
		toggleInterestById($(this), id, $(this).attr("id"));
	});
	truncateDescription();
	sessionTooltip();
});

function actionAbout(){
	var buttonArray = {};
	var buttons = parseButtons($('#fileDetailDialog .formButtonRow'));
	
	//Download
	buttonArray[buttons[0]] = function(){
		actionDownload();
	};
	
	//Close
	buttonArray[buttons[1]] = function(){
		$(this).dialog('close');
	};

	var detailDialog = $('#fileDetailDialog');
	var modalBoolean = (top.self === self)? true : false;
	$(detailDialog).dialog({
		width: 600,
		modal: modalBoolean,
		buttons: buttonArray,
		open: function(){
			if(modalBoolean === true)
				$("body").addClass("noScroll");
			var fileId = $(currentDocItem).prop('id').split('_')[1];
			var type = $(currentDocItem).prop('id').split('_')[0];

			for(var x in fileDetailJSON){
				if(fileDetailJSON[x].type === type && fileDetailJSON[x].fileId === parseInt(fileId, 10)){
					$(detailDialog).find('#fileTitle b').html(fileDetailJSON[x].title);
					$(detailDialog).find('#fileDesc b').html(fileDetailJSON[x].desc);
					if(fileDetailJSON[x].size){
						$('#fileSize b').html(fileDetailJSON[x].size);
						$('#fileSize').show();
					}
					else $('#fileSize').hide();
					if(fileDetailJSON[x].date){
						$('#fileDate b').html(fileDetailJSON[x].date);
						$('#fileDate').show();
					}
					else $('#fileDate').hide();
					break;
				}
			}
		},
		close: function(){
			if(modalBoolean === true)
				$("body").removeClass("noScroll");
		}
	});
}

function getSessionTimes(sessionId){
	var $ul = $('#sessionSchedule ul.availableSessions');
	$ul.addClass('loading');

	getAvailableSessions(sessionId, function(result){
		$ul.removeClass('loading');
		getAvailableSessionsCallback(sessionId, $ul, null, result);
	})
}

function actionDownload(){
	var url = $(currentDocItem).data('url');
	if(url == 'logout'){
		top.loginDialog();
		return false;
	}
	else
		window.open(url);
}

function getParameters() {
	var url = window.location.search.substring(1);
	var paramList = url.split("&");
	var jsonObj = {};
	for (var x in paramList) {
		var paramObj = paramList[x].split("=");
		jsonObj[unescape(paramObj[0])] = unescape(paramObj[1]);
	}
	return jsonObj;
}

function getRating($el){
	if($el.size() && $.trim($el.text()).length && isFinite($el.text())){
		return roundRating($el.text());
	}
	return 0;
}

function initRatings(sid){
	$('#userRatingWrap').stars({
		inputType: "select",
		cancelShow: false,
		callback: function(ui, type, value){
			var sessionId = $('#sessionId').val();
			$('#currentUserRating').css('visibility', 'visible');
			if(value > 0){
				$('#yourRating').html(roundRating(value));
			}
			var logId = $('#sessionViewedLogID').val();
			rateSession(sessionId, value, logId, function(result){ratingCallback(result)});
		}
	}).find('input.formButton').hide();
	
	var avgRating = getRating($('#currentRating'));
	$('#avgRatingWrap').stars({
		inputType: "select",
		cancelShow: false,
		split: parts
	})
	$('#avgRatingWrap').stars("select", avgRating);
	$('.sessionRating').css('visibility', 'visible');
}

function parseButtons($container){
	var buttonArray = [];
	$container.find('button').each(function(){
		buttonArray.push($(this).find('span').html());
	});
	return buttonArray;
}

function personSocialLink(element){
	var id = $(element).attr("id");
	var key = $(element).attr("class");
	var parent = $(element).parents("ul").attr("class");
	var url = "";
	switch(key){
		case "google": url="http://plus.google.com/"+ id +"/"; break;
		case "linkedin": url="http://www.linkedin.com/" + id + "/"; break;
		case "facebook": url="http://www.facebook.com/"+ id; break;
		case "twitter": url="http://twitter.com/#!/"+ id; break;
		case "blog": url = 'http://' + id; break;
	}
	window.open(url);
}

function ratingCallback(result){
	var logId = result[0];
	var currentRating = result[1];
	if(isFinite(logId) && isFinite(currentRating)){
		currentRating = parseFloat(currentRating).toFixed(decimalPlaces);
		$('#currentRating').html(currentRating);
		$('#avgRatingWrap').stars("select", roundRating(currentRating));
		$('#sessionViewedLogID').val(logId);
	}
	if($('#noRating').hasClass('hide')){
		return false;
	}
	else{
		$('.starCount, .starRating, #avgRatingLbl, .outOf').removeClass('hide');
		$('#noRating').addClass('hide');
	}
}

function roundRating(rating){
	return (Math.round(rating * parts) / parts).toFixed(decimalPlaces);
}

function truncateDescription(){
	var viewMoreTxt = $('#moreLinkText').html() || "View More";
	$('#documentDownload').find('ul.listScroll .listItem').children('span').each(function(){
		var fullTxt = $(this).html();
		var truncatedTxt = truncateStr(fullTxt, {maxLength: 320, postfix: '... <a href="javascript:void(0);" class="moreLink truncated">'+viewMoreTxt+'</a>'});
		$(this).html(truncatedTxt);
	});
	$('#documentDownload').on('click', '.moreLink', function(){currentDocItem = $(this).closest(".listItem"); actionAbout();});
}