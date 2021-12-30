//时间戳转换
const timeFormat = function(value, format) {
  var date = new Date(value);
  function addZero(date) {
    if (date < 10) {
      return "0" + date;
    }
    return date;
  }
  let getTime = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear() % 100,
    MM: addZero(date.getMonth() + 1),
    M: date.getMonth() + 1,
    dd: addZero(date.getDate()),
    d: date.getDate(),
    HH: addZero(date.getHours()),
    H: date.getHours(),
    hh: addZero(date.getHours() % 12),
    h: date.getHours() % 12,
    mm: addZero(date.getMinutes()),
    m: date.getMinutes(),
    ss: addZero(date.getSeconds()),
    s: date.getSeconds(),
    w: (function() {
      let a = ["日", "一", "二", "三", "四", "五", "六"];
      return a[date.getDay()];
    })()
  };
  for (let i in getTime) {
    format = format.replace(i, getTime[i]);
  }
  return format;
};

const userType = function(value) {
  var userType = {
    0: "系统管理员",
    1: "部门管理员",
    2: "普通管理员",
    3: "学生",
    4: "家长"
  };
  return userType[value];
};

const Department = function(value) {
  var DeptType = {
    0: "ROOT",
    1: "教务处",
    2: "团委",
    3: "学生工作处"
  };
  return DeptType[value];
};

const InfoType = function(value) {
  var InfoType = {
    0: "公共信息",
    1: "考试通知",
    2: "学科竞赛",
    3: "专项工作"
  };
  return InfoType[value];
};

//导出方法
export { timeFormat, userType, Department, InfoType };
