const treeArrDataByRow = realData.split('\n');

const treeArrDataByColumn = [];


//creates the column data
for (let i = 0; i < treeArrDataByRow.length; i++) {
  let currentColumn = '';
  for (let j = 0; j < treeArrDataByRow.length; j++) {
    currentColumn+=treeArrDataByRow[j][i];
  }
  treeArrDataByColumn.push(currentColumn);
}



let countOfVisible = 0;

for (let i = 0; i < treeArrDataByRow.length; i++) {
  for (let j = 0; j < treeArrDataByRow.length; j++) {
    //if the number is on the outside edge - increment the count of visible
    if (i === 0 || i === treeArrDataByRow.length - 1 || j === 0 || j === treeArrDataByRow.length - 1) {
      countOfVisible++;
    } else {
      checkLeftVisibility(i, j);
    }
  }
}

function checkLeftVisibility(i, j) {
  const currentNumber = treeArrDataByRow[i][j];
  for (let k = j - 1; k >= 0; k--) {
    //if the previous number is bigger than the index then go on to the next function to checkRightVisibility
    if (currentNumber <= treeArrDataByRow[i][k]) {
      checkRightVisibility(i, j);
      return;
    //if we made it to the first number in the row and the currentNumber is still greater - increment the countOfVisible
    } else if (k === 0) {
      countOfVisible++;
    }
  }
}

function checkRightVisibility(i, j) {
  const currentNumber = treeArrDataByRow[i][j];
  for (let k = j + 1; k < treeArrDataByRow.length; k++) {
    if (currentNumber <= treeArrDataByRow[i][k]) {
      checkUpVisibility(i, j);
      return;
    } else if (k === treeArrDataByRow.length - 1) {
      countOfVisible++;
    }
  }
}

function checkUpVisibility(i, j) {
  const currentNumber = treeArrDataByColumn[j][i];
  for (let k = i - 1; k >= 0; k--) {
    if (currentNumber <= treeArrDataByColumn[j][k]) {
      checkDownVisibility(i, j);
      return;
    } else if (k === 0) {
      countOfVisible++;
    }
  }
}


function checkDownVisibility(i, j) {
  const currentNumber = treeArrDataByColumn[j][i];
  for (let k = i + 1; k < treeArrDataByColumn.length; k++) {
    if (currentNumber <= treeArrDataByColumn[j][k]) {
      return;
    } else if (k === treeArrDataByRow.length - 1) {
      countOfVisible++;
    }
  }
}

console.log(countOfVisible);
