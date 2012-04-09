(function(){
	define(['require/text', 'vender/jquery', 'vender/ember'], function(text, $, Em){

		var hbs = $.extend({}, text, {
			load: function( name, parentRequire, onLoad, config ){
				text.load(name, parentRequire, function(content){
					// pull the template name from the name of the resource
					// we exclude the .hbs extension any any query params attached to it
					var templateName = name.split(/\.hbs(\?.*)?$/i, 1);
					// compile the template and register templateName with Ember
					Em.TEMPLATES[templateName] = Em.Handlebars.compile(content);
					onLoad(templateName);
				}, config);
			}
		});

		return hbs;
	});
})();