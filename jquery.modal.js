define(['jquery.boiler', 'modules/modal/templates'], function($, T){

	//Make an object to be used by both $.modal and $.fn.modal
	$.Modal = function(options){
		
		var plugin = {
			settings: $.extend({}, {
				content: '',
				template: 'modalDefault',
				modal: '.modal',
				modalContent: '.modal__content',
				exit: '.modal__close',
				onOpen: false,
				onClose: false,
				fixed: false,
				stopPropagation: false
			}, options),
			init: function(){
				var plugin = this;

				//Cache wrapper, modal, and exit
				plugin.$wrapper = $(T[plugin.settings.template]())._hide();
				plugin.$modal = plugin.$wrapper.find(plugin.settings.modal);
				plugin.$content = plugin.$wrapper.find(plugin.settings.modalContent);
				plugin.$exit = plugin.$wrapper.find(plugin.settings.exit);

				//Add content
				plugin.$content.html(plugin.settings.content);

				//Append modal to body
				$('body').append(plugin.$wrapper);

				//Close event on wrapper click and exit click
				var $stop;
				if(plugin.settings.stopPropagation){
					$stop = plugin.$wrapper.find(plugin.settings.stopPropagation);
				} else{
					$stop = plugin.$modal;
				}

				var stop = false;
				plugin.$wrapper.click(function(){
					if(stop){
						stop = false;
					} else {
						plugin.close();
					}
				});
				$stop.click(function(e){
					stop = true;
				});
				plugin.$exit.click(function(){
					plugin.close();
				});
			},
			open: function(){
				var plugin = this;

				//Calculate top
				if(!plugin.settings.fixed){
					var top = ($(window).height() - plugin.$modal.height()) / 2;
					top = Math.max(top, 0);
					plugin.$modal.css('top', $(window).scrollTop() + top);
				}


				plugin.$wrapper.addClass('is-active')._fadeIn(250);

				if(plugin.settings.onOpen) plugin.settings.onOpen.call(plugin);
			},
			close: function(){
				var plugin = this;

				plugin.$wrapper.removeClass('is-active')._fadeOut(250);

				if(plugin.settings.onClose) plugin.settings.onClose.call(plugin);
			},
			update: function(content){
				plugin.$content.html(content);
			}
		};

		plugin.init();

		return plugin;
	};

	$.boiler('modal', {
		defaults: {},

		init: function(){
			var plugin = this;

			plugin.modal = new $.Modal({
				content: plugin.$el.html()
			});
		},

		open: function(){
			this.modal.open();
		},

		close: function(){
			this.modal.close();
		}
	});

	// Return the jquery object
	// This way you don't need to require both jquery and the plugin
	return $;

});