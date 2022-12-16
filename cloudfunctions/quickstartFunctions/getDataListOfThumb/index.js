const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
const $ = db.command.aggregate;
const _ = db.command;
/*
event:{
    openId, 
}
*/
exports.main = async (event, context)=>{
    return await db.collection('wills')
    .aggregate()
    .match(event.match)
    .sort(event.sort)
    .skip(event.skip)
    .limit(event.limit)
    .lookup({
        from: 'thumbs',
        let:{
            id: '$_id',
        },
        pipeline: $.pipeline().match(_.expr($.and([
            $.eq(['$openId', event.openId]),
            $.eq(['$thumbId', '$$id'])
        ])))//openId = event.openId, thumbId = _id
        .project({
            openId:0,
            thumbId:0
        })
        .done(),
        as: 'hasThumb',
    })
    .end()
}