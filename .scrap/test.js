for (let prop in OMMS.xml[i]) {
    let x = OMMS.xml[i][prop];
    let j = OMMS.json[i][prop];
    let c = OMMS.csv[i][prop];
    let t = LEGACY.tle[i][prop];
    if (x === j && j === c && c === t) {
      /*if(prop === 'EPOCH')
       console.log(`OK:${prop}
         XML:  ${x}
         JSON: ${j}
         CSV:  ${c}
         TLE:  ${t}`);*/
    } else {
      /*
      console.log(`FAIL: PROP: ${prop} ${OMMS.xml[i].NORAD_CAT_ID} ${OMMS.json[i].NORAD_CAT_ID} ${OMMS.csv[i].NORAD_CAT_ID}
        XML:  ${x}
        JSON: ${j}
        CSV:  ${c}
        TLE:  ${t}`);*/
    }
  }