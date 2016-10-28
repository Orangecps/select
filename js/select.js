;(function($){
	//获取json数据
	function getData(){
		var data = null;
		$.ajax({
			url:"data.json",
			dataType:"json",
			async:false,
			success:function(e){
				data = e;
			}
		})
		return data;
	}
	$(".first_menu").select({
		data:getData()    
	})
})(Zepto)