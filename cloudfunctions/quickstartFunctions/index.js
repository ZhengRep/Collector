const getOpenId = require('./getOpenId/index');
const addRecord = require('./addRecord/index');
const getDataList = require('./getDataList/index')
const updateRecord = require('./updateRecord/index')
const addThumbNum = require('./addThumbNum/index')
const cancleThumb = require('./cancleThumb/index')
const getDataListOfThumb = require('./getDataListOfThumb/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
        return await getOpenId.main(event, context);
    case 'addRecord':
        return await addRecord.main(event, context);
    case 'getDataList':
        return await getDataList.main(event, context);
    case 'updateRecord':
        return await updateRecord.main(event, context);
    case 'addThumbNum':
        return await addThumbNum.main(event, context);
    case 'cancleThumb':
        return await cancleThumb.main(event, context);
    case 'getDataListOfThumb':
        return await getDataListOfThumb.main(event, context);
    default:
        return 'no function';
  }
};
