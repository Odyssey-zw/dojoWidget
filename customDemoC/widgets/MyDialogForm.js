define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",

	"dojo/text!./templates/MyDialogForm.html",

	"dijit/Dialog",
	"dijit/form/Form",
	"dijit/form/ValidationTextBox",
	"dijit/form/DateTextBox",
	"dijit/form/Select",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/HorizontalSlider",
	"dijit/form/HorizontalRule",
	"dijit/form/HorizontalRuleLabels",
	"dijit/form/NumberSpinner",
	"dijit/form/Button"
],function(declare,lang,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,template){

	return declare("customDemoC.widgets.MyDialogForm",[_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],{

		templateString : template,

		textBoxInvalidMessage : "只能输入英文小写字母",
		textBoxTooltipPosition : "below-centered",

		startup : function(){
			this.myDialogForm.show();	//展示该组件前执行的最后方法
		},

		onDialogClose: function(){},	//预留一个空方法,用于创建该组件实例时重写一个销毁前需要执行的方法

		onAgreeClick: function(){
	      console.log('注册执行的方法');
	      console.log(this.myForm.getValues());
	      this.sendArgsBeforeDestroy();
	    },

	    onDisagreeClick: function(){
	      console.log('取消执行的方法');
	      this.destroyInstance();
	    },

	    //关闭widget并销毁
	    destroyInstance : function(){
	    	this.myDialogForm.hide().then(lang.hitch(this, function() {	
	        	this.destroyRecursive();	//销毁当前组件及其子组件
	        	console.log("dialog及其子组件销毁")
	      	}));
	    },

	    //传参后销毁该widget
	    sendArgsBeforeDestroy : function() {
	    	this.myDialogForm.hide().then(lang.hitch(this, function() {
	        	this.onDialogClose(this.myForm.getValues());	
	        	this.destroyRecursive();
	      	}));
	    }
	});
})