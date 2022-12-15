const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context)=>{
   //associate thumbs and wills
   try{
    await db.collection('thumbs').add({
        data:{
              openId: event.openId,
              thumbId: event.thumbId,
          }
    })
    
    const _ = db.command;
    return await db.collection('wills').where({
        _id: event.thumbId
    }).update({
        data:{
            thumbNum: _.inc(1)
        }
    })

   }catch(e){
       return{
           success: false,
           errMsg: e,
       }
   }

}
