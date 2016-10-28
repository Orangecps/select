;(function($){
	$.fn.select = function(opt){
		var _dis = $.extend({
			data:null
		},opt);
		return $(this).each(function(ind,ele){
			var key = $(this).data("key"),//获取属性里的键值 来查找json的数据
				arr = null,//接收json数据的第三方参数
				str = "<option>--请选择--</option>",
				sel = $(this).find("select");
			//判断数据对象是数组类型还是对象类型
			//if(_dis.data[key] instanceof Array){
			//Object.prototype.toString.call(_dis.data[key])=='[object Array]')
			if(Object.prototype.toString.call(_dis.data[key])=='[object Array]'){
				arr = _dis.data[key];//如果该数据对象是数组
			}else{
				arr = _dis.data[key].option;//如果该数据对象是对象
			}
			$.each(arr,function(i,value){
				var val = value.value || value.id,
					txt = value.text || value.name;
				str+="<option value='"+val+"'>"+txt+"</option>"
			})
			sel.html(str);
			//lebel的默认显示
			$(this).find("label").html(sel.find("option").eq(0).text());
			//sel
			sel.on("change",function(){
				var thisInd = this.selectedIndex,
					opts = this.options[thisInd].text,
					subsel = $(this).parent().next()
					substr = '',
					subselMenu = subsel.find("select"),
					sublabel = subsel.find("label");
				$(this).prev().text(opts);
				//显示二级菜单
				if(thisInd!=0){//显示
					subsel.css('visibility','visible');
					//渲染二级列表
					$.each(arr[thisInd-1].option,function(i,val){
						var tet = val.name || val.text,
							ind = val.id || val.value;
						substr+="<option value='"+ind+"'>"+tet+"</option>";
					})
					subselMenu.html(substr);
					//二级列表 label的默认显示
					sublabel.html(subselMenu.find("option").eq(0).text());
					//二级列表的点击事件
					subselMenu.on("change",function(){
						var subind = this.selectedIndex;
						sublabel.html(this.options[subind].text);
					})
				}else{//隐藏
					subsel.css('visibility','hidden');
				}
			})
		})
	}
})(Zepto)