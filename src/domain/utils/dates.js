const regex = /(\d+)\/(\d+)\/(\d{4})\s(\d{2}):(\d{2}):(\d{2})/;

function parseDate(str) {
  //--- THIS COMMENTS ARE RELATED WITH PERFORMANCE. see readme
  //with split and replace
  // let strDate = str.replace(/\//g,":").replace(/ /g,":").split(":");
  // let aDate = new Date(strDate[2], strDate[1]-1, strDate[0], strDate[3], strDate[4], strDate[5]) ;
  // let periodMin =  str.substring(0, 9+ strDate[1].length+ strDate[0].length);
  //let strDate = str.replace(/\//g,":").replace(/ /g,":").split(":");

  //with regex match
  let strDate = str.match(regex);

  if (!strDate) {
    return null;
  }
  let aDate = new Date(
    strDate[3],
    strDate[2] - 1,
    strDate[1],
    strDate[4],
    strDate[5],
    strDate[6]
  );
  let periodMin = str.substring(0, 9 + strDate[2].length + strDate[1].length);

  return {
    date: aDate,
    periodMin,
  };
}

module.exports = parseDate;
