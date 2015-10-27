define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/store/Memory",
	"dojo/data/ObjectStore",

	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",

	"dojox/grid/EnhancedGrid",
	"dojox/grid/_CheckBoxSelector",

	"./MyDialogForm",
	"./MyDialogGrid",

	"dojo/text!./templates/MyEntry.html",

	"dijit/form/Button"
],function(declare,lang,on,Memory,ObjectStore,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,EnhancedGrid,_CheckBoxSelector,MyDialogForm,MyDialogGrid,template){
	
	//创建一个数组作为源数据,也可以使用request获取response等数据
	var arr = new Array({name:"Tom",sex:"f",hobby:"['sport', 'sleep', 'food']",marriage:"Y",education:"3",experience:"3",birthDate:"1983-5-3"},
								{name:"Jarry",sex:"m",hobby:"['sport', 'food']",marriage:"N",education:"2",experience:"3",birthDate:"1988-10-23"});
	var store = new Memory({data : arr});
	var dataStore = new ObjectStore({objectStore :store});

	var layout = [{
			type : "dojox.grid._CheckBoxSelector"
		},{
			cells : [
	            {name : "姓名", field : "name", width : "15%", editable:true},
	            {name : "性别", field : "sex", width : "10%",editable:true},
	            {name : "爱好", field : "hobby", width : "20%"},
	            {name : "婚否", field : "marriage", width : "10%"},
	            {name : "学历", field : "education", width : "10%"},
	            {name : "工龄", field : "experience", width : "15%"},
	            {name : "生日", field : "birthDate", width : "15%"}
        	]
		}]

	//创建一个Grid用于显示dataStore中的数据
	var myGrid = new EnhancedGrid({
        // store : dataStore,
        // query : {id : "*"},
        structure : layout
    });

	return declare("customDemoC.widgets.MyEntry",[_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin],{

		templateString : template,

		myButtonToFormLabel : "注册个人信息",
		myButtonToGridLabel : "显示EnhancedGrid",

		startup : function(){
			console.log("主页面启动前最后的操作");
			// var myGrid = this.createGrid();
			myGrid.setStore(dataStore);	//显示前设置数据源
			myGrid.placeAt(this.myGrid);
			console.log("创建的grid并显示");
			myGrid.startup();
		},

		//myDialogForm组件点击注册销毁前将参数传至此处
		onMyDialogClose : function(){
			console.log("myDialogForm 关闭前Entry中进行的方法");
			console.log(arguments);	//可以看出传过来的参数
			console.log(store.query({name:"Tom"})[0]);	//store.query({name:"Tom"})查询store中name为"Tom"的对象,返回一个Array数组
			// store.put({name:"Jack",sex:"f",hobby:"['sleep', 'food']",marriage:"Y",education:"3",experience:"2",birthDate:"1973-5-3"});
			store.put(arguments[0]);	//将form数据加入store

			myGrid.setStore(dataStore);	//重新设置数据源

			console.log(store);
		},

		//第一个按钮事件
		onMyButtonToFormClick : function(){
			console.log("新建dialog实例");
			var myDialogForm = new MyDialogForm({
				onDialogClose : lang.hitch(this,"onMyDialogClose")
			});
			myDialogForm.startup();
		},

		//第二个按钮事件
		onMyButtonToGridClick : function(){
			var myDialogGrid = new MyDialogGrid();
			myDialogGrid.startup();
		}

	});
})