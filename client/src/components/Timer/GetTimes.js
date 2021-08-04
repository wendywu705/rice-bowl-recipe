const matchUnit = (unit, strArr, round) => {
  let match = strArr.match(unit);
  if (match) {
    let arr = strArr.substring(0, match.index-1).split(/[\s,]+/)
    let num = arr[arr.length-1]
    if (num.includes('-')) {
      num = num.substring(num.indexOf('-')+1, num.length)
    }
    if (unit === 'minute' || unit === 'minutes') {
      num *= 60
    }
    else if (unit === 'hour' || unit === 'hours'){
      num *= 3600
    }
    return([num, round])
  }
}

const possibleUnits = [
  'minute',
  'hour',
  'min',
  'hr'
];

const GetTimes = (dir) => {
  var numArr = []
  for (let i=0; i<dir.length; i++) {
    for (let j=0; j<possibleUnits.length; j++) {
      let possibleMatch = matchUnit(possibleUnits[j], dir[i], i)
      if (possibleMatch) {
        numArr.push(possibleMatch)
      }
    }
  }
  return numArr;
}
export default GetTimes;