const sampleData = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const realData = `Monkey 0:
Starting items: 91, 58, 52, 69, 95, 54
Operation: new = old * 13
Test: divisible by 7
  If true: throw to monkey 1
  If false: throw to monkey 5

Monkey 1:
Starting items: 80, 80, 97, 84
Operation: new = old * old
Test: divisible by 3
  If true: throw to monkey 3
  If false: throw to monkey 5

Monkey 2:
Starting items: 86, 92, 71
Operation: new = old + 7
Test: divisible by 2
  If true: throw to monkey 0
  If false: throw to monkey 4

Monkey 3:
Starting items: 96, 90, 99, 76, 79, 85, 98, 61
Operation: new = old + 4
Test: divisible by 11
  If true: throw to monkey 7
  If false: throw to monkey 6

Monkey 4:
Starting items: 60, 83, 68, 64, 73
Operation: new = old * 19
Test: divisible by 17
  If true: throw to monkey 1
  If false: throw to monkey 0

Monkey 5:
Starting items: 96, 52, 52, 94, 76, 51, 57
Operation: new = old + 3
Test: divisible by 5
  If true: throw to monkey 7
  If false: throw to monkey 3

Monkey 6:
Starting items: 75
Operation: new = old + 5
Test: divisible by 13
  If true: throw to monkey 4
  If false: throw to monkey 2

Monkey 7:
Starting items: 83, 75
Operation: new = old + 1
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 6`

const monkeyInstructions = sampleData.split(/\n\s*\n/);

const monkeysAndItems = {};

let monkeyCount = 0;

function parseAndRunOperation(item, instruction) {
  const splitInstruction = instruction.split(' ');

  while (splitInstruction.includes('old')) {
    splitInstruction[splitInstruction.indexOf('old')] = item;
  }
  if (splitInstruction.includes('+')) {
    return Number(splitInstruction[splitInstruction.indexOf('+') - 1]) + Number(splitInstruction[splitInstruction.indexOf('+') + 1]);
  } else {
    return Number(splitInstruction[splitInstruction.indexOf('*') - 1]) * Number(splitInstruction[splitInstruction.indexOf('*') + 1]);
  }
}

function isItemDivisibleTest(item, instruction) {
  const numToDivideBy = Number(instruction.split(' ')[instruction.split(' ').length - 1]);
  if (item / numToDivideBy % 1 === 0) {
    return true;
  } else return false;
}

for (const monkey of monkeyInstructions) {
  const currentMonkeyNum = monkey.split('\n')[0].split(' ')[1][0];
  monkeysAndItems[currentMonkeyNum] = {
    numOfItemsSeen: 0,
    currentItems: [monkey.split('\n')[1].split(',')[0].split(' ')[monkey.split('\n')[1].split(',')[0].split(' ').length - 1]]
  };
  for (let i = 1; i < monkey.split('\n')[1].split(',').length; i++) {
    monkeysAndItems[currentMonkeyNum].currentItems.push(monkey.split('\n')[1].split(',')[i]);
  }
}

const numOfTimesToRunLoop = monkeyInstructions.length * 20;

let something;

for (let i = 0; i < numOfTimesToRunLoop; i++) {
  while (monkeysAndItems[monkeyCount].currentItems.length > 0) {
    let item = monkeysAndItems[monkeyCount].currentItems[0];
    //loop through current monkey's itmes

      //increment the numOfItemsSeen for the monkey
      monkeysAndItems[monkeyCount].numOfItemsSeen++;
      //multiply or add item by monkey's worry level (Operation)
      item = parseAndRunOperation(item, monkeyInstructions[monkeyCount].split('\n')[2]);
      //divide new worry level by 3
    //   item = Math.floor(item / 4);
      //if currentWorryLevel is divisible by (Test)
      if (isItemDivisibleTest(item, monkeyInstructions[monkeyCount].split('\n')[3])) {
        //throw to the (If true) monkey
        monkeysAndItems[monkeyInstructions[monkeyCount].split('\n')[4].split(' ')[7]].currentItems.push(Number(item));
      } else {
        //else
          //throw to the (If false) monkey
          monkeysAndItems[monkeyInstructions[monkeyCount].split('\n')[5].split(' ')[7]].currentItems.push(Number(item));
      }
      //remove item from current monkey
      monkeysAndItems[monkeyCount].currentItems.shift();
  }



  //check if monkeyCount goes to another monkey or if the loop needs to be reset
    //if there is another monkey
    if (monkeysAndItems[monkeyCount + 1]) {
      //increment monkeyCount
      monkeyCount++;
    } else {
      //set monkeyCount back to 0
      monkeyCount = 0;
    }
}

let highestCount = 0;
let secondhighestCount = 0;

//loop through monkeysAndItems to get the multiplied total of numOfItemsSeen 
for (const monkey in monkeysAndItems) {
  if (monkeysAndItems[monkey].numOfItemsSeen > highestCount) {
    secondhighestCount = highestCount;
    highestCount = monkeysAndItems[monkey].numOfItemsSeen;
  } else if (monkeysAndItems[monkey].numOfItemsSeen > secondhighestCount) {
    secondhighestCount = monkeysAndItems[monkey].numOfItemsSeen;
  }
}

console.log(monkeysAndItems);

console.log('TOTAL: ', highestCount * secondhighestCount);
