const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const ismobile = phone=> {
  var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  var moblie = phone;

  if (isNaN(moblie)) {
    return false;
  }
  else if (moblie.length != 11) {

    return false;
  } else if (!phonetel.test(moblie)) {

    return false;
  } else {
    return true;

  }
}

module.exports = {
  formatTime: formatTime,
  isMobile: ismobile
}
