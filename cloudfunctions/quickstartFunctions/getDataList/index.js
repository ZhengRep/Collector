const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async(event, context) => {
   try{
       return await db.collection(event.database)
       .where(event.where)
       .orderBy(event.orderBy, 'desc')
       .get()
   }
   catch(e){
        return {
            errMsg: e,
            success: false,
        }
   }
   
}