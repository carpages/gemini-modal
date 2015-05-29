(function(factory) {

if (typeof define === 'function' && define.amd) {

define(['handlebars'], factory);

} else if (typeof exports === 'object') {

module.exports = factory(require('handlebars'));

} else {

factory(Handlebars);

}

}(function(Handlebars) {

this["Templates"] = this["Templates"] || {};
this["Templates"]["Default"] = this["Templates"]["Default"] || {};
this["Templates"]["Default"]["Modal"] = this["Templates"]["Default"]["Modal"] || {};

this["Templates"]["Default"]["Modal"]["modal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"js-modal  modal\">\n  <div class=\"js-modal__content  modal__content\"></div>\n  <div class=\"js-modal__close  modal__close\">Close</div>\n</div>\n";
},"useData":true});

return this["Templates"]["Default"]["Modal"];

}));