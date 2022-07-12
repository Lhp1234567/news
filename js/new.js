$(function(){
    // 定义补零函数
    function padZero(n){
        if (n<10){
           return '0'+n
        }else{
            return n
        }


    }
    function getNewlist(){
        // 定义时间过滤器
        template.defaults.imports.tagTime=function(dtStr){
            var dt=new Date(dtStr)
            var y=dt.getFullYear();
            var m=padZero(dt.getMonth() +1);
            var d=padZero(dt.getDay())
            var h=padZero(dt.getHours())
            var mm=padZero(dt.getMinutes())
            var ss=padZero(dt.getSeconds())
            return y+'-'+m+'-'+d+' '+h+':'+mm+':'+ss
           }   

        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/news',
            success:function(res){
                if(res.status !==200){
                    return alert('获取数据失败')
                }
                console.log(res.data)
                for( var i=0;i<res.data.length;i++){
                    // 将tags属性中，将字符串改为字符串的数组
                res.data[i].tags=res.data[i].tags.split(',')
                }
            var htmlstr= template('tpl-news',res)
            $('#new-list').html(htmlstr)
            }
        })                        
    }
    getNewlist()
})