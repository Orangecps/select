function Select(opt){
	//将参数作为构造函数的属性：目的是让参数能在该构造函数所有的方法中使用
	this.sel = opt.sel;
	this.init();//页面初始化函数
	this.same();
}
Select.prototype = {
	//所有的功能语句都以方法的形式创建
	init:function(){
		//隐藏原有的select框
		for(var i=0,l=this.sel.length;i<l;i++){
			this.sel[i].style.display='none';
		}
	},
	same:function(){
		//模仿菜单 创建HTML节点
		for(var i=0,l=this.sel.length;i<l;i++){
			//把所有要用到的节点放在一个数组里
			var htmlNode = ['<i></i><h5></h5>','<ul class="hide">'],
				opts = this.sel[i].options,//获取当前select框里的所有option选项
				warp = document.createElement("div"),//创建一个标签存放节点
				_this = this;
			for(var j=0;j<opts.length;j++){//遍历所有的option选项添加li
				htmlNode.push("<li data-val='"+opts[j].value+"' id='"+j+"'>"+opts[j].text+"</li>");
			}
			htmlNode.push("</ul>");
			//把数组里的节点拼接成字符串追加到div容器里
			warp.innerHTML=htmlNode.join("");
			this.sel[i].parentNode.insertBefore(warp,this.sel[i]);//把这个容器追加到当前select框的前边
			warp.children[1].innerHTML=opts[0].text;//设置默认显示项为列表的第一个option的值
			(function(n){//给容器添加点击事件 用touchend添加(闭包的方法)
				warp.addEventListener("touchend",function(e){
					_this.eventClick(this,e,_this.sel[n]);//点击时调用的方法
				},false)
			})(i)//给这个容器添加点击事件
		}
	},
	eventClick:function(obj,e,oldSel){//点击时调用的方法
		//接收传入的值 找到该容器的所有子元素
		var sub = obj.children;
		if(sub[2].className=='hide'){//如果obj下的ul是隐藏的让他显示 显式的让他隐藏
			sub[2].className ='';
			sub[0].style.borderBottomColor="transparent";
			sub[0].style.borderTopColor="#fff";
			sub[0].style.top="20px";
		}else{
			sub[2].className='hide';
			sub[0].style.borderBottomColor="#fff";
			sub[0].style.borderTopColor="transparent";
			sub[0].style.top="10px";
		}
		//console.log(oldSel);
		if(e.target.nodeName=="LI"){
			sub[1].innerHTML = e.target.innerHTML;
			//建立ul和原来select框的联系触发select的change事件
			//方法 让原来select的默认选中项变成点击对象(e.targrt)的索引
			oldSel.selectedIndex = e.target.id;//建立联系
			//自动执行默认的change事件
			//1)调用document对象的 createEvent方法得到一个event对象的实例
			var event = document.createEvent("TouchEvent");
			//2)initEvent接受了3个参数，事件类型、是否冒泡、是否阻止浏览器的默认行为
			event.initEvent("change",true,true);
			//3)是哪个对象要触发该事件
			oldSel.dispatchEvent(event);
		}
	}
}