import axios from "axios";

function https(data){
    console.log(openapp)
    var method=data.method||'get'
    if(openapp){
    var newheader=''
    var lodata={}
    if(data.headers){
      newheader={
          "Authorization": api.getPrefs({sync: true,key: 'SessionKey'}),
          "Content-Type": 'application/json; charset=utf-8'
      }
    }
    if(method=="get"){
      lodata={
          values:data.data
      }
    }else if(method=="post"){
      lodata={
          body:data.data
      }
    }
    api.ajax({
        url:data.url,
        method: method,
        data:lodata,
        headers:newheader,
        dataType:data.dataType||'json'
    },function(ret, err){
        if (ret) {
          if(data.successBack){
            data.successBack(ret)
          }
        } else {
          if(err.statusCode=='403'){
            api.removePrefs({ key:'SessionUserID'})
            api.removePrefs({ key:'SessionName'})
            api.removePrefs({ key:'SessionKey'})
            api.removePrefs({ key:'SessionShopID'})
            api.setPrefs({ key:'loginStatus',value:'loginFail'})//过期清除信息
            api.openWin({
              name: 'login',
              url: api.wgtRootDir+'/html/login.html'
            })
          }
          if(data.errorBack){
            data.errorBack(err)
          }else{
            promptMsg(err.msg)
          }
        }
    })
}else{
    axios({
        method:method,
        url:data.url,
        data:data.data
      }).then(function(response) {
        data.successBack(response)
      });
}
  }

  