$(function(){
	// page specific
	customizeLoginPage();
	customizeDashboardPage();
	customizeSearchPage();
	customizeInterestsPage();
	customizeMySchedulePage();
	
	// general
	$(".form_actions input, .linkButton, input.form_btn, input[type=submit]").not(".hiddenSearchButton").button();
	
	// move the login/logout link to the nav
	var loginLogoutLink = $("#templateHeader #headerNav li.last a");
	$("#mainNav ul:first").append(loginLogoutLink);
	updateFooter();
});

// -------------------
// --- search page ---
// -------------------
function customizeSearchPage(){
	if ($("#searchForm").length) {
		insertSearchSubHeader();
		customizeSearchHeader();
		customizeNavSelect();
		
		//$("#subHeader").after($("#mainNav"));
		$("nav").show();
	}
}

// -------------------
// --- Interests page ---
// -------------------
function customizeInterestsPage(){
	if ($("#interestsTabs").length) {
		$("nav").addClass("interestsNav");
		$("nav").show();
		$("#templateContent > p").after($("nav"));
	}
}

// -------------------
// -- schedule page --
// -------------------
function customizeMySchedulePage(){
	if ($("#mySchedule").length){
		$("nav").addClass("scheduleNav");
		$("nav").show();
		$("#templateContent > h1").after($("nav"));
		$("#templateContent > h1").after("<p>To schedule a session: click on the timeslot you would like to schedule, find the desired session and then click the session you would like to schedule. Note: The system will not allow you to schedule overlapping sessions.<br/><br/>To avoid conflicts between sessions and meetings you have scheduled, please use the \"Add Personal Time\" option to enter your meetings into your personal schedule.</p>");
	}
}

function insertSearchSubHeader(){
	$("body").not(".popup").find("#templateMain").before("<div id='subHeader'><div class='leftSubHeader'><h1>Session catalog</h1><p>With hundreds of sessions to choose from, HP Discover 2013 is the premier technology event of the year. Discover how HP innovations will help you deliver a new style of IT to improve how you work, find new opportunities, make new connections, and empower a whole new generation of employees. This event brings together thousands of IT executives, managers, architects, engineers, and solution experts from around the world to solve the toughest enterprise IT challenges.</p><p>Take a look below at a sample of the sessions Discover has covering the hottest topics in the industry today and be sure to join us in Las Vegas to discover new ways to make technology work for you! Use the filters to view all content relevant to your interests.</p></div><div class='rightSubHeader'></div></div>");
	$(".rightSubHeader").append($("#mainNav"));
}

function customizeSearchHeader(){
	$("#searchFilters").before("<div id='searchHeader'><h2>Find sessions</h2></div><div><h3>Filter:</h3></div>");
	$("#searchHeader h2").after($("#searchForm"));
	$("#searchFilters").after("<div id='buttonBar'><input id='buttonBarSearch' type='button' class='form_btn' value='Search' /><input id='buttonBarClear' type='reset' class='grayButton form_btn' value='Clear' /></div>");
	
	$("#buttonBarSearch").click(function(){
		$('#searchForm').submit();
	});
	
	$("#buttonBarClear").click(function(){
		$('nav form').each(function(){
			this.reset();
			$(this).find("select").each(function(){
				$(this).val("");
				var title = $(this).closest(".formRow").find(".filter-header").text();
				$(this).closest(".filter-list").find(".selected-text").html(title);
			});
		});
		
		$("#searchForm .searchPhrase").val("");
		$('#searchForm .searchPhrase').data('blank');
		$('input.hiddenSearchPhrase').val('');
		$('#searchForm').submit();
	});
	
	$(".searchSubmit").val("");
}

function customizeNavSelect(){
	// convert the first filter option (which is a radio button) into a select
	var $radioSessionTypeID = $("input[type=radio][name=sessionTypeID]").closest("label.filter-item");
	var $sessionTypeContainer = $radioSessionTypeID.closest("div");
	
	// move the session type filter to the 3rd location in the list
	var secondFilterLoc = $($sessionTypeContainer.closest("form").find("fieldset:first").find("div.formRow")[1])
	secondFilterLoc.after($sessionTypeContainer.closest(".formRow"));
	
	$radioSessionTypeID.hide();
	$sessionTypeContainer.append("<select id='sessionTypeID' name='sessionTypeID'><option value=''></option></select>");
	$radioSessionTypeID.each(function(){
		// convert the radio buttons into <option tags>
		$sessionTypeContainer.find("option:last").after("<option value='" + $(this).find("input").val() + "' id='" + $(this).find("input").attr("id") + "'>" + $(this).text() + "</option>");
	});
	$sessionTypeContainer.find("select").change(function(){
		filterSearch();
	});
	
	
	// make all the selects look like HP Selects
	$('nav select').not(".hpConnectSelect, .hpSelect").each(function(){
		$(this).addClass("hpConnectSelect");
		var title = $(this).closest(".formRow").find(".filter-header").text();
		$(this).find("option:first").html(title);
		
		$(this).before("<span class='selected-text'>" + $(this).find("option:selected").html() + "</span><div class='dropdown-carat'></div>");
		$(this).change(function(){
			$(this).closest(".filter-list").find(".selected-text").html($(this).find("option:selected").html());
		})
	});
	
	// show the sponsors
	$("#rotatorContainer").show();
}

// -------------------
// --- login page ----
// -------------------
function customizeLoginPage(){
	if ($("#loginForm:visible").length){
		$("#fieldsetLoginForm:visible").after(getSideBarHtml());
		$("#fieldsetLoginForm:visible .formButtonRow").append($("#fieldsetLoginForm:visible #createAccount"));
		$("nav").hide();
	}
}


// -------------------
// - dashboard page --
// -------------------
function customizeDashboardPage(){
	var sideContent = $($("#centerCol .ui-widget-content")[1]);
	sideContent.append($("nav #mainNav"));
	sideContent.append(getSideBarHtml());
	$("nav").hide();
}

// -------------------
// ----- general -----
// -------------------
function updateFooter(){
	$("#templateFooter").html('<div class="copyFooter"><p>&copy; 2013 Hewlett-Packard Development Company, L.P.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://www8.hp.com/us/en/privacy/privacy.html">Privacy Rights Notice</a> | <a target="_blank" href="http://www8.hp.com/us/en/privacy/privacy.html">Privacy Statement</a> | <a target="_blank" href="http://www8.hp.com/us/en/privacy/terms-of-use.html">Terms of Use</a></p></div>');
}

function getSideBarHtml(){
	var navSideHtml = "";
	
	navSideHtml += '<div id="sideBarInfo">'
	navSideHtml += '<div class="navSection" id="eventInfo">';
	navSideHtml += 	'<h3>Event information</h3>';
	navSideHtml += 	'<div id="eventName">HP Discover Las Vegas 2013</div>';
	navSideHtml += 	'<div id="eventCity">Las Vegas</div>';
	navSideHtml += 	'<div id="eventVenue">The Venetian | The Palazzo Resort</div>';
	navSideHtml += 	'<div id="eventDates"></div>';
	navSideHtml += '</div>';
	navSideHtml += '</div>';
	
	return navSideHtml;
}