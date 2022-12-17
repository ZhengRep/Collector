const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async(event, context)=>{
    try{
        db.collection('wills').where({
            _id: event._id
        }).remove()

        return db.collection('thumbs').where({
            thumbId: event._id
        }).remove()

    }
    catch(e){
        return {
            success: false,
            errMsg: e
        }
    }
}