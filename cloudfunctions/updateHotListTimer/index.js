// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
    var today = db.serverDate({
        offset: -1000*60*60*24*7 //7 day ago
    });
    db.collection('wills').where({
        hadHot: false,
        thumbNum: _.gte(7),
        date: _.lte(today),
    }).update({
        data:{
          hadHot: true,
        }
    })
} 