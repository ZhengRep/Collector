const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context)=>{
    try{
        await db.collection('thumbs').where({
            openId: event.openId,
            thumbId: event.thumbId,
        }).count()
        .then(res=>{
            if(res.total){
                db.collection('wills').where({
                    _id: event.thumbId,
                }).update({
                    data:{
                        thumbNum: _.inc(-1)
                    }
                })
        
                //delete thumbs
                return db.collection('thumbs').where({
                    openId: event.openId,
                    thumbId: event.thumbId,
                }).remove()
            }
        })
    }
    catch(e){
        return {
            success: false,
            errMsg: e,
        }
    }
}