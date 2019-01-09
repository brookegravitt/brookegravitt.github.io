$(function(){
	replaceCheckboxes();
	replaceRadioButtons();
	replaceDropDowns();
	
	$("select, input[type=radio], input[type=checkbox]").change(function(){replaceDropDowns();repositionDropDowns();replaceCheckboxes();replaceRadioButtons();});
	$(document).click(function(){replaceDropDowns();repositionDropDowns();replaceCheckboxes();replaceRadioButtons();repositionRadioCheckboxes();});
	$("#profileItem_803_803").next().removeAttr("style");
	
	repositionRadioCheckboxes();
});

function replaceCheckboxes(){
	$("input[type=checkbox]:visible").not(".hiddenCheckbox").each(function(){
		$(this).addClass("hiddenCheckbox");
		$(this).after("<span class='checkBox' style='margin:" + getMargins($(this)) + "'><a class='" + getInputState($(this)) + "' >&nbsp;</a></span>");
		moveSpecificRadioCheckbox($(this));
		$(this).change(function(){
			$(this).next(".checkBox").find("a").attr("class", getInputState($(this)));
		});
	});
}

function replaceRadioButtons(){
	$("input[type=radio]:visible").not(".hiddenCheckbox").each(function(){
		$(this).addClass("hiddenCheckbox");
		$(this).after("<span class='radio' style='margin:" + getMargins($(this)) + "'><a class='" + getInputState($(this)) + "' >&nbsp;</a></span>");
		moveSpecificRadioCheckbox($(this));
		$(this).change(function(){
			$("input[name='" + $(this).attr("name") + "']").each(function(){
				$(this).next(".radio").find("a").attr("class", getInputState($(this)));
			});
		});
	});
}

function repositionRadioCheckboxes(){
	$(".hiddenCheckbox").each(function(){
		moveSpecificRadioCheckbox($(this));
	});
}

function replaceDropDowns(){
	// make all the selects look like HP Selects
	$('select:visible').not(".hpConnectSelect, .hpSelect, #sessionSort, #speakerSort, #exhibitorSort").each(function(){
		
		// ignore dropw downs in dialogs
		if ($(this).closest(".ui-dialog").length)
			return;
			
		$(this).addClass("hpSelect");
		
		if ($(this).find("option:first").val() == ""){
			$(this).find("option:first").html("Select one");
		}
		else{
			$(this).find("option:first").before("<option value=''>Select one</option>");
		}
		$(this).before("<span class='selected-text'>" + $(this).find("option:selected").html() + "</span><div class='carat-container'><div class='dropdown-carat'></div></div>");
		moveSpecificDropDown($(this));
		
		$(this).change(function(){
			var $selectSpan = $(this).prev().prev(".selected-text");
			var $caratContainer = $(this).prev(".carat-container");
			
			// update text and color
			$selectSpan.html($(this).find("option:selected").html());
			updateDropDownColor($(this), $selectSpan);
			
			// update height
			updateHeight($(this), $selectSpan, $caratContainer);
		});
		
		$(this).hover(function(){
				$(this).prev().prev(".selected-text").css("border-color", "#5A5A5A");
				$(this).prev(".carat-container").css("border-color", "#5A5A5A");
			}, function(){
				$(this).prev().prev(".selected-text").css("border-color", "#ccc");
				$(this).prev(".carat-container").css("border-color", "#ccc");
			}
		);
		
		updateDropDownColor($(this), $(this).prev().prev(".selected-text"));
		updateHeight($(this), $(this).prev().prev(".selected-text"), $(this).prev(".carat-container"));
	});
}

function updateHeight($select, $selectSpan, $selectCarat){
	$selectSpan.height($select.height());
	$selectCarat.height($select.height());
}
function updateDropDownColor($select, $selectSpan){
	if ($select.val() == "") $selectSpan.addClass("defaultVal");
	else $selectSpan.removeClass("defaultVal");
}

function getMargins($srcElement){
	var margins = "";
	margins += $srcElement.css("marginTop") + " ";
	margins += $srcElement.css("marginRight") + " ";
	margins += $srcElement.css("marginBottom") + " ";
	margins += $srcElement.css("marginLeft");
	return margins;
}

function getInputState($input){
	return $input.attr("disabled") ? "disabled": ($input.attr("checked") ? "checked": "unChecked");
}

function repositionDropDowns(){
	$("select.hpSelect").each(function(){
		moveSpecificDropDown($(this));
	});
}

function moveSpecificDropDown($select){
	var $selectPos = $select.prev().prev(".selected-text").position();
	var $selectOffset = $select.prev().prev(".selected-text").offset();
	$select.css({"top":$selectPos.top + "px", "left":$selectPos.left + "px"});
}

function moveSpecificRadioCheckbox($input){
	var $customInput = $input.next("span");
	$customInput.css({"left":$input.position().left+"px", "top":$input.position().top+"px"});
}