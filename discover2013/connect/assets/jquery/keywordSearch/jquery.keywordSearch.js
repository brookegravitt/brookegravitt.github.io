;(function($) {

	$.fn.keywordSearch = function(options) {
		// default options
		var defaults = {
			blankText: "Keyword Search"
		};
		var opts = $.extend(true, {}, defaults, options);
		
		return this.each(function() {
			var $self = $(this).addClass("ks-container ui-state-default");
			var $phrase = $self.find('input[type=text]');
			var $clearBtn = $('<span class="ui-icon ui-icon-circle-close ks-clear"></span>').click(
				function(){
					$phrase.val('');
					toggleClearBtn($phrase, this);
					if($self.parent().attr('id') == 'searchForm')
						submitSearch();
				}
			);
			
			$self.addClass('ui-corner-all')
				.find('input[type=text]').addClass('ui-corner-all').end()
				.find('input[type=submit],input[type=button]').button().after('<div class="clear-both"></div>').after($clearBtn);
			
			$self.hover(
					function(){ $(this).addClass('ui-state-hover ks-hover'); },
					function(){ $(this).removeClass('ui-state-hover ks-hover'); }
				);
				
			$phrase.bind('keyup.clearBtn', function(){ 
				toggleClearBtn(this, $clearBtn) 
			});	
			
			$phrase.focus(function(){
				if($(this).data('blank') == true){
					$(this).data('blank', false).val('').removeClass('no-phrase');
				}
				$self.addClass('ks-active').find('input[type=submit]');
			});

			$phrase.blur(function(){
				if(praseIsBlank(this)){
					$phrase.data('blank', true).addClass('no-phrase').val(opts.blankText);
				}
				toggleClearBtn(this, $clearBtn);
				$self.removeClass('ks-active').find('input[type=submit]');
			});

			$phrase.blur();

			$self.click(function(){
				$(this).find('input[type=text]').focus();
			});
		});
		
		function toggleClearBtn(phrase, clearBtn){
			if(praseIsBlank(phrase)){
				$(clearBtn).hide();
			}
			else{
				$(clearBtn).show();
			}
		}
		
		function praseIsBlank(phrase){
			return ($(phrase).val().length == 0 || $(phrase).val() == opts.blankText);
		}
	};
})(jQuery);
