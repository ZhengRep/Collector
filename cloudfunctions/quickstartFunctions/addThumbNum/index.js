const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context)=>{
   //associate thumbs and wills
   try{
    var hasThumbNum = db.collection('thumbs').where({
        openId: event.openId,
        thumbId: event.thumbId,
    }).count()
    .then(res=>{
        if(res.total){
            return {
                success: true,
                fistThumb: false
            }
        }
        db.collection('thumbs').add({
            data:{
                  openId: event.openId,
                  thumbId: event.thumbId,
              }
        })
        
        const _ = db.command;
        db.collection('wills').where({
            _id: event.thumbId
        }).update({
            data:{
                thumbNum: _.inc(1)
            }
        }).then(res=>{
            return {
                success: true,
                firstThumb: true
            }
        })
    })
   }catch(e){
       return{
           success: false,
           errMsg: e,
       }
   }

}
