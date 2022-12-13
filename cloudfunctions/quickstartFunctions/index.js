const getOpenId = require('./getOpenId/index');
const addRecord = require('./addRecord/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'addRecord':
      return await addRecord.main(event, context);
  }
};
