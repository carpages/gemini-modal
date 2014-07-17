define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["modal"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"js-modal\" class=\"modal\">\n  <div id=\"js-modal__content\" class=\"modal__content\"></div>\n  <div id=\"js-modal__close\" class=\"modal__close\"></div>\n</div>\n";
  });

return this["JST"];

});