define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/store/Memory",
	"dojo/data/ObjectStore",

	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/Dialog",

	"dojo/text!./templates/MyDialogGrid.html",

	"dojox/grid/DataGrid",
	"dijit/form/Button"
],function(declare,lang,Memory,ObjectStore,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,Dialog,template,DataGrid){

	return declare("customDemoC.widgets.MyDialogGrid",[_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],{

		templateString : template,

		startup : function(){
			this.myDialogGrid.show();
		},

		onCloseClick : function(){
			console.log("调用关闭方法");
			this.destroyInstance();
		},

		destroyInstance : function(){
			this.myDialogGrid.hide().then(lang.hitch(this,function(){
				this.destroyRecursive();
				console.log("销毁该组件了");
			}))
		}

	});
})