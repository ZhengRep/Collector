// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
    db.collection('wills').where({
        '_id': "df35299463a032e20041891636737f90",
    }).update({
        data:{
          thumbNum: _.inc(1),
        }
    })
} 