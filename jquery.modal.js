/**
 * @fileoverview

A jQuery plugin to to easily pop content up in a modal.

### Notes
- Requires an include to ``accordian.scss`` in your Gemini build

### Features
- You can call ``$el.modal()`` to put the content of $el into a modal. To avoid
rendering the same content twice, you can put it in a ``<script>`` tag.

 *
 * @namespace jquery.modal
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires jquery
 * @requires jquery.boiler
 *
 * @prop {string} content {@link jquery.modal#content}
 * @prop {function} onOpen {@link jquery.modal#onOpen}
 * @prop {function} onClose {@link jquery.modal#onClose}
 * @prop {object} templates {@link jquery.modal#templates}
 *
 * @example
  var modal = $.Modal({
    content: '<h1>Hello World!</h1>'
  });

  modal.open();
 */

define(['jquery-loader', 'jquery.modal.templates', 'jquery.boiler'], function($, T){

  //Make an object to be used by both $.modal and $.fn.modal
  $.Modal = function(options){

    var plugin = {
      settings: $.extend({}, {
        /**
         * The HTML content to put in the modal
         *
         * @name jquery.modal#content
         * @type string
         * @default ''
         */
        content: '',
        /**
         * Callback function to run when the modal opens
         *
         * @name jquery.modal#onOpen
         * @type function
         * @default false
         */
        onOpen: false,
        /**
         * Callback function to run when the modal closes
         *
         * @name jquery.modal#onClose
         * @type function
         * @default false
         */
        onClose: false,
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
        plugin.$wrapper = $(plugin.T.modal())._hide();
        plugin.$modal = plugin.$wrapper.find('.js-modal');
        plugin.$content = plugin.$wrapper.find('.js-modal__content');
        plugin.$exit = plugin.$wrapper.find('.js-modal__close');

        //Add content
        plugin.$content.html(plugin.settings.content);

        //Append modal to body
        $('body').append(plugin.$wrapper);

        //Close event on wrapper click and exit click
        var $stop = plugin.$modal;

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

      /**
       * Open the modal
       *
       * @method
       * @name jquery.modal#open
      **/
      open: function(){
        var plugin = this;

        //Calculate top
        var top = ($(window).height() - plugin.$modal.height()) / 2;
        top = Math.max(top, 0);
        plugin.$modal.css('top', $(window).scrollTop() + top);


        plugin.$wrapper.addClass('is-active')._fadeIn(250);

        if(plugin.settings.onOpen) plugin.settings.onOpen.call(plugin);
      },

      /**
       * Close the modal
       *
       * @method
       * @name jquery.modal#close
      **/
      close: function(){
        var plugin = this;

        plugin.$wrapper.removeClass('is-active')._fadeOut(250);

        if(plugin.settings.onClose) plugin.settings.onClose.call(plugin);
      },

      /**
       * Update the content inside of the modal
       *
       * @method
       * @name jquery.modal#update
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
