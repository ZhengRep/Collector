const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database;

exports.main = async (event, context)=>{
    //associate thumbs and wills
    
    //increment thumb num
}
