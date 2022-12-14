const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database();

exports.main = async (event, context)=>{
    try{
        return await db.collection(event.database)
        .where(event.where)
        .update(event.update)
    }
    catch(e){
        return {
            success: false,
            errMsg: e,
        }
    }
}