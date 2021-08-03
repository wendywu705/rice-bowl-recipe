const matchUnit = (unit, strArr, round) => {
  let match = strArr.match(unit);
  if (match) {
    let arr = strArr.substring(0, match.index-1).split(/[\s,]+/)
    let num = arr[arr.length-1]
    if (unit === 'minute' || unit === 'minutes') {
      num *= 60
    }
    else if (unit === 'hour' || unit === 'hours'){
      num *= 3600
    }
    return([num, round])
  }
}

const GetTimes = (dir) => {
  var numArr = []
  for (let i=0; i<dir.length; i++) {
    if (matchUnit('minute', dir[i], i)) {
      numArr.push(matchUnit('minute', dir[i], i))
    }
    if (matchUnit('hour', dir[i], i)) {
      numArr.push(matchUnit('hour', dir[i], i))
    }
  }
  return numArr;
}
export default GetTimes;