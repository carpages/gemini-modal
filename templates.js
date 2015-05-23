define(['handlebars'], function(Handlebars) {

this["Templates"] = this["Templates"] || {};
this["Templates"]["Modal"] = this["Templates"]["Modal"] || {};

this["Templates"]["Modal"]["modal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"js-modal  modal\">\n  <div class=\"js-modal__content  modal__content\"></div>\n  <div class=\"js-modal__close  modal__close\">Close</div>\n</div>\n";
},"useData":true});

return this["Templates"];

});