define([
	'vender/ember',
	'hbs!app/views/main.hbs',
	'less!app/styles/main.less'
], function(Em, template){
	var App = window.App = Em.Application.create();

	App.MainView = Em.View.create({
		templateName: template,
		mouseDown: function() {
			window.alert("hello world!");
		}
	});

	return App;
});