/* eslint key-spacing: ["error", { "align": "colon" }] */
requirejs.config({
  baseUrl: '../',
  paths  : {
    'underscore'            : 'bower_components/underscore/underscore',
    'jquery'                : 'bower_components/jquery/dist/jquery',
    'handlebars'            : 'bower_components/handlebars/handlebars.runtime',
    'jquery.boiler'         : 'bower_components/jquery-boiler/jquery.boiler',
    'gemini.support'        : 'bower_components/gemini-support/gemini.support',
    'gemini'                : 'bower_components/gemini-loader/gemini',
    'gemini.modal.templates': 'templates'
  }
});

require([ 'gemini', 'gemini.modal' ], function( G ) {
  $( '#js-modal-test' ).modal();

  $( '#js-open-modal' ).click( function() {
    $( '#js-modal-test' ).modal( 'open' );
  });
});
