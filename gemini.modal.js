/**
 * @fileoverview

A Gemini plugin to to easily pop content up in a modal.

### Notes
- Requires an include to ``accordian.scss`` in your Gemini build

### Features
- You can call ``$el.modal()`` to put the content of $el into a modal. To avoid
rendering the same content twice, you can put it in a ``<script>`` tag.

 *
 * @namespace gemini.modal
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @prop {string} content {@link gemini.modal#content}
 * @prop {function} onOpen {@link gemini.modal#onOpen}
 * @prop {function} onClose {@link gemini.modal#onClose}
 * @prop {object} templates {@link gemini.modal#templates}
 *
 * @example
  var modal = G.Modal({
    content: '<h1>Hello World!</h1>'
  });

  modal.open();
 */

define(['gemini', 'gemini.modal.templates'], function($, T){

  //Make an object to be used by both $.modal and $.fn.modal
  $.Modal = function(options){

    var plugin = {
      settings: $.extend({}, {
        /**
         * The HTML content to put in the modal
         *
         * @name gemini.modal#content
         * @type string
         * @default ''
         */
        content: '',
        /**
         * Callback function to run when the modal opens
         *
         * @name gemini.modal#onOpen
         * @type function
         * @default false
         */
        onOpen: false,
        /**
         * Callback function to run when the modal closes
         *
         * @name gemini.modal#onClose
         * @type function
         * @default false
         */
        onClose: false,
        /**
         * Whether to position the modal wrapper as fixed or not. This setting
         * will cut off content in the screen is small than the containing
         * content
         *
         * @name gemini.modal#fixed
         * @type boolean
         * @default false
         */
        fixed: false,
        /**
         * A selector describing the content of the modal. Anything clicked
         * outside of these items will close the modal.
         *
         * @name gemini.modal#stopPropagation
         * @type string
         * @default ''
         */
        stopPropagation: '',
        /**
         * Precompiled Handlebar templates to replace default. Expecting 'modal'
         * @name jquery.gallery#templates
         * @type object
         * @default {}
         */
        templates: {},
      }, options),

      init: function(){
        var plugin = this;

        //Extend the templates
        plugin.T = $.extend(T, plugin.settings.templates);

        //Cache wrapper, modal, and exit
        plugin.$modal = $(plugin.T.modal())._hide();
        plugin.$content = plugin.$modal.find('#js-modal__content');
        plugin.$exit = plugin.$modal.find('#js-modal__close');

        //Add content
        plugin.$content.html(plugin.settings.content);

        //Append modal to body
        $('body').append(plugin.$modal);

        //Close event on wrapper click and exit click
        var $stop = plugin.$modal.find(
          '.js-modal__clickable, ' +
          plugin.settings.stopPropagation
        );

        var stop = false;
        plugin.$modal.click(function(){
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

      /**
       * Open the modal
       *
       * @method
       * @name gemini.modal#open
      **/
      open: function(){
        var plugin = this;

        //Calculate top if not fixed
        if(plugin.settings.fixed){
          plugin.$modal.addClass('modal--fixed');
        }else{
          var top = ($(window).height() - plugin.$content.height()) / 2;
          top = Math.max(top, 0);
          plugin.$content.css('top', $(window).scrollTop() + top);
        }


        plugin.$modal.addClass('is-active')._fadeIn(250);

        if(plugin.settings.onOpen) plugin.settings.onOpen.call(plugin);
      },

      /**
       * Close the modal
       *
       * @method
       * @name gemini.modal#close
      **/
      close: function(){
        var plugin = this;

        plugin.$modal.removeClass('is-active')._fadeOut(250);

        if(plugin.settings.onClose) plugin.settings.onClose.call(plugin);
      },

      /**
       * Update the content inside of the modal
       *
       * @method
       * @name gemini.modal#update
       * @param {string} content The HTML content to put inside of the modal
      **/
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
