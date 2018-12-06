;(function(win, doc) {

	var msRight = function(options) {
		var defaults = {
			rootName:rootNode,
			childNode:".mouse-item>dl>.child-item",
			menu:[{
				text:"开机",
				callback:function(){
					alert("我是开机");
				}
			},{
				text:"关机",
				callback:function(){
					alert("关机");
				}
				
			}]
		};
		// 判断是用函数创建的还是用new创建的。msRight("dom") 或 new msRight("dom")来使用这个插件了  
		if(!(this instanceof msRight)) return new msRight( options);
		
		// 参数合并  
		this.options = this.extend(defaults, options);
	
		// 初始化  
		this.init();
	};

	msRight.prototype = {
		init: function() {
			this.disabledms();
			this.events();
		},
		extend:function(defaults, options) {
			for(var k in options) {
				defaults[k] = options[k];
			}
			return defaults;
		},
		disabledms:function(){
			win.oncontextmenu = function() {
				return false
			};
		},
		events: function() {
			var _this = this,
			parentNode=_this.options.rootName;
			parentNode.mousedown(function() {
				_this.msdown();
			});
			_this.addEleItem();
		},
		msdown:function(){
			this.dragable = false;
			this.handler(event);
		},
		handler:function(e){
			if(e.button == 2) { // 右键
				document.getElementById("msRight").style.cssText = "top:" + e.pageY + "px;left:" + e.pageX + "px;display:block;";
			}
		},
		msshow:function(){
			document.getElementById("msRight").style.cssText ="display: none;";
		},
		addEleItem:function(){
			var _this=this,dataItemValue,allItem;
			allItem=document.querySelectorAll(_this.options.childNode);
			for (let i=0;i<allItem.length;i++) {
				allItem[i].setAttribute("data-item",i);
				allItem[i].onclick=function(e){
					dataItemValue=e.target.parentNode.getAttribute("data-item");
					if(dataItemValue==i){
						_this.options.menu[i].callback();
					}
					_this.msshow();
				}
				
			}
		}
		
		
	};
	win.msRight = msRight;
}(window, document));