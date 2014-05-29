define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"w-modal\">\n	<div class=\"js-modal modal\">\n		<i class=\"js-modal__close modal__close\"></i>\n		<div class=\"js-modal__content modal__content\"></div>\n	</div>\n</div>\n";
  });

return this["JST"];

});