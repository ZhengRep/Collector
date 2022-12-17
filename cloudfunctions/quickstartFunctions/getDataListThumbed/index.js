const cloud = require('wx-server-sdk');
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database();
var $ = db.command.aggregate;

exports.main = async (event, context)=>{
    return await db.collection('thumbs')
    .aggregate()
    .match(event.match)
    .sort(event.sort)
    .skip(event.skip)
    .limit(event.limit)
    .lookup({
        from: 'wills',
        localField: 'thumbId',
        foreignField: '_id',
        as: 'willInfo',
    })
    .project({
        _id:0,
        openId: 0,
        thumbId: 0,
    })
    .replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$willInfo', 0]), '$$ROOT'])
    })
    .project({
        willInfo: 0,
    })
    .addFields({
       hasThumb: true, 
    })
    .end()
}