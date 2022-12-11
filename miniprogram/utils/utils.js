const formatTime = (date,type) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    
    let timeStr = ''
    switch(type){
      case 'YYYY-MM-DD':
        timeStr = [year, month, day].map(formatNumber).join('-')
        break
      case 'hh:mm':
        timeStr = [hour, minute].map(formatNumber).join(':')
        break
      default:
        timeStr = [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
        break
    }
    return timeStr
  }

  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  module.exports = {
    formatTime: formatTime
  }