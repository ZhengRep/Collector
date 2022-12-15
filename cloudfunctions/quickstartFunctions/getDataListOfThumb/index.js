const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
const $ = db.command.aggregate
/*
event:{
    openId, 
}
*/
exports.main = async (evnet, context)=>{
    // db.collection('wills').aggregate()
    // .lookup({
    //     from: ''
    // })
}