define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["modalDefault"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-wrapper soft-half\">\n	<div class=\"modal container soft overlay\">\n		<i class=\"modal__close icon--close icon--button overlay__content--top-right\"></i>\n		<div class=\"modal__content\"></div>\n	</div>\n</div>";
  });

this["JST"]["modalGallery"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-wrapper modal-wrapper--fixed\">\n	<div class=\"modal overlay full\">\n    <i class=\"modal__close icon--close icon--button overlay__content--top-right\"></i>\n		<div class=\"modal__content\"></div>\n	</div>\n</div>\n";
  });

return this["JST"];

});