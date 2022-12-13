const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async(event, context) => {
    try{
       await db.collection(event.database).add({
           data: event.record,
       })
       return {
           success: true,
       }
    }
    catch(e){
        return {
            errMsg: e,
            success: false,
        }
    }
}