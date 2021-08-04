const matchUnit = (unit, strArr, round) => {
  let match = strArr.match(unit);
  let tempArr = []
  if (!match) {
    return null;
  }
  while(strArr.match(unit)) {
    let arr = strArr.substring(0, strArr.match(unit).index-1).split(/[\s,]+/)
    let num = arr[arr.length-1]
    
    if (num.includes('-')) {
      num = num.substring(num.indexOf('-')+1, num.length)
    }
    if (isNaN(num) || num.length===0) { // not a number
      strArr = strArr.substring(strArr.match(unit).index+3, strArr.length)
      continue
    }
    if (unit.match('min')) {
      num *= 60
    }
    else if (unit.match('hour') || unit.match('hr')){
      num *= 3600
    }
    tempArr.push([num, round])
    strArr = strArr.substring(strArr.match(unit).index+3, strArr.length)
  }
  if (tempArr.length === 0) {
    return null;
  } else {
    return tempArr;
  }
}

const possibleUnits = [
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
        for (let n=0; n<possibleMatch.length; n++){
          numArr.push(possibleMatch[n])
        }
        // continue
      }
    }
  }
  return numArr;
}
export default GetTimes;