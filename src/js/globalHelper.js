class globalHelper {
    toast(text){
    	//console.log(vm.$refs);
        eventBus.$emit("toast",text)
    }
	sendPostRequest(options) {
		var self = this;
		var params = options.params;
		
		//附加参数
		params.os_type = myApp.device.os;
		params.timestamp  = Math.round(new Date().getTime()) + "";
		params.version = "1.0";
		
		var r = $$.ajax({
			url : options.url,
			method : "post",
			data : params,
			crossDomain : true,
			async : options.async!=null ? options.async : true,
			timeout : 5000, 
			dataType : "json",
			// 请求成功
			success : function(res){
				console.log("success========")
				r = null;
				options.success.call(this,res);
			},
			// 请求失败(当回调方法success中有错时，status=parseerror)
			error : function(xhr,status){
				console.log("error========"+status)
				r = null;
		        options.error.call(this,xhr);
				
			},
			complete : function(xhr,status) {
				r = null;
			}
		});
		
		// 5秒之后确认是否需中断请求
	/*	setTimeout(function(){
			if(r&&r.readyState!=4){
				console.log(r);
				console.log("@@##sendPostRequest,“"+params.service_id+"”请求超时(5s)");
				r.abort();
			}
		},5000);*/
	}
	
	
}
export default new globalHelper();

