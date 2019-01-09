var mediaPopupPadding = 25;

$(function(){
	$('#mediaSection').on('click', 'li a, #carousel a', showMediaDialog);
	if($('#carousel div').length){
		$('#carousel').show().cycle({
			pause: 1,
			fx: 'scrollHorz'
		});
	}
});

function showMediaDialog(){
	var $anchor = $(this);
	var $dialog = $('#mediaPopup');
	var popupWidth = 0;
	var showDialog = true;
	
	switch($anchor.data('provider')){
		case 'ooyala':
			$('.ooyala').removeClass('ooyala');
			$anchor.addClass('ooyala');
			$dialog.html('<iframe src="' + baseHref + '/ooyala.ww" width="640" height="375" frameborder="0"></iframe>');
			popupWidth = 680;
			break;
		case 'ustream':
		case 'youtube':
			$dialog.html($anchor.data('url'));
			popupWidth = parseInt($('#mediaPopup iframe').attr('width')) + mediaPopupPadding;
			break;
		case 'on24':
		case 'webex':
			window.open($anchor.data('url'));
			showDialog = false;
			break;
		case 'html5':
			_V_.options.flash.swf = baseHref + "/assets/js/detail/video-js/video-js.swf"
			var $video = $("#html5Video").clone().attr("id", $anchor.data("id"));
			$video.find(".mp4").attr("src", $anchor.data("url"));
			$dialog.html($video);
			_V_($anchor.data("id"), {}, function(){
				popupWidth = parseInt($("#" + $anchor.data("id")).attr("width")) + mediaPopupPadding;
				$dialog.dialog("option", "width", parseInt($("#" + $anchor.data("id")).attr("width")) + mediaPopupPadding);
				$dialog.dialog("option", "position", "center");
				$dialog.data("destroy", $anchor.data("id"));
			});
			break;
		case 'rockfish':
			if(typeof(oVC) != "undefined"){
				var $video = $('#ciscoVideoTemplate').clone();
				$video.attr('id', 'ciscovideo');
				$dialog.html($video);
				oVC.init('ciscovideo', $anchor.data('url'), 0);
				var isFlash = document.getElementById('ciscovideo');
				if (isFlash.nodeName == "VIDEO") {
					alert('test')
					setTimeout(function(){
						alert('test2')
						oVC.setListeners();
					}, 100);
				}
				isFlash = null;
				popupWidth = $('#ciscovideo').width()
			} else {
				showDialog = false;
			}
			break;
	}
	
	if(showDialog){
		var buttonArray = new Object();
		buttonArray[$('#closeButtonText').html()] = function(){
			$(this).dialog('close');
		}

		$dialog.dialog({
			title: $anchor.find('.name').html(),
			width: popupWidth,
			position: "center",
			buttons: buttonArray,
			close: function(){
				// sanitize streams
				if($("#mediaPopup").data("destroy")){
					_V_($("#mediaPopup").data("destroy")).destroy();
				}
				$("#mediaPopup").html("");
			}
		});
	}
}

function getOoyalaData(){
	var $anchor = $('.ooyala');
	return $anchor.data('url');
}

//----------------------------- Cisco Specific -----------------------------//
this.logEvent = function (text) {
	this.debugInfo.appendChild(document.createTextNode(text));
	this.debugInfo.appendChild(document.createElement('br'));
}
		
function ProgressEvent() {
	logEvent('Progress Event : ');
}
		
function FinishedEvent() {
	logEvent('The video has ended : ');
}
		
function PlayEvent() {
	logEvent('Play Event : ');
}
		
function PauseEvent() {
	logEvent('Paused Event : ');
}
		
function ShareEvent() {
	logEvent('Share Event : ');
}
		
function popout(point) {
	this.timeLasped = point;
	//This coulbe better implemented with jQuery
	window.open('index.html', 'PopoupPlayer', 'width=984,height=490,location=0,resizable=0,scrollbars=0,status=0,toolbar=0' , true);
	logEvent('enlapsed time: ' + point + ' AT: ');
}