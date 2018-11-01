/* 
 * created by Brad R. Allen
 */

function flip(divID) {
      divID = document.getElementById(divID);
    
  if (divID.className === 'thefront') {
    divID.className = 'theback';
  } else if (divID.className === 'theback') {
    divID.className = 'thefront';
  }
}