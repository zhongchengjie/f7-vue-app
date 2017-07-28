class globalHelper {
    toast(text){
    	//console.log(vm.$refs);
        eventBus.$emit("toast",text)
    }
	ajax(options) {
		var self = this;
		var params = options.params;
		
		//附加参数
		if(options.method=="post"){
		    params.os_type = myApp.device.os;
		    params.timestamp  = Math.round(new Date().getTime()) + "";
		    params.version = "1.0";
		}
	
		var r = $$.ajax({
			url : options.url,
			method : options.method,
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
	
	//时间格式转换
    timeTransform(timeStr){
        var result = timeStr;
        var timeStr = timeStr.replace(/-/g,"/")
        var date_time =new Date(timeStr);
        var timeStamp1 = date_time.getTime();   //创建时间的时间戳1
        var timeStamp2 = new Date().getTime();  //当前时间的时间戳2
        var _time = parseInt((timeStamp2-timeStamp1)/60000);      //相差分钟数
        //console.log(_time);
        if(_time<3){
            result = "刚刚";
        }
        else if(_time<60){
            result = _time+"分钟前";
        }
        else if(_time<24*60){
            result = parseInt(_time/60)+"小时前";
        }
        else{
            result = timeStr.substr(5);
        }
        return result;
    }
	
	
}
export default new globalHelper();

