
//HOW SPLIT METHOD ACTUALLY WORKS UNDER THE HODD JUST FOR PRACTICE

function mySplit(strng, split) {
    let result = [];
    let splitVal = '';
      // debugger
    for (let i = 0; i <= strng.length; i++) {
      //  let j = strng[i];
       
       if (split === " " || split === '') {
             result.push(strng[i])
      }
       
      else if (strng[i] != split && strng[i]) {
               
          splitVal += strng[i]
       }
        else {
          result.push(splitVal)
          splitVal = '';
       }
 
    }
 
    console.log(result);
    return result;
 }
 
 mySplit('12232+34+3-1*2', "2")