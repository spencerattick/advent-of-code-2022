const sampleData = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const realData = `addx 1
noop
noop
addx 4
addx 5
addx -2
addx 19
addx -12
addx 3
addx -2
addx 4
noop
noop
noop
addx 3
addx -8
addx 15
addx 1
noop
noop
addx 6
addx -1
noop
addx -38
noop
addx 10
addx -5
noop
addx 3
addx 2
addx 7
noop
noop
addx 3
noop
addx 2
addx 3
addx -2
addx 2
addx 7
noop
noop
addx 9
noop
addx -12
noop
addx 11
addx -38
noop
noop
noop
addx 5
addx 5
noop
noop
noop
addx 3
addx -12
addx 14
noop
addx 1
addx 3
addx 1
addx 5
addx 4
addx 1
noop
noop
noop
noop
noop
addx -9
addx 17
addx -39
addx 38
addx -8
addx -26
addx 3
addx 4
addx 16
noop
addx -11
addx 3
noop
addx 2
addx 3
addx -2
addx 2
noop
addx 13
addx -8
noop
addx 7
addx -5
addx 8
addx -40
addx 16
addx -9
noop
addx -7
addx 8
addx 2
addx 7
noop
noop
addx -15
addx 16
addx 2
addx 5
addx 2
addx -20
addx 12
addx 11
addx 8
addx -1
addx 3
noop
addx -39
addx 2
noop
addx 5
noop
noop
noop
addx 4
addx 1
noop
noop
addx 2
addx 5
addx 2
addx 1
addx 4
addx -1
addx 2
noop
addx 2
noop
addx 8
noop
noop
noop
addx -10
noop
noop`;

const instructionArr = realData.split('\n');

let xTotal = 1;

let cycleNum = 0;

let totalSignalStrength = 0;

function addToSignalStrength() {
  totalSignalStrength += xTotal * cycleNum;
  console.log('3CYCLE: ', cycleNum)
  console.log('3SIGNALTOADD: ', xTotal * cycleNum)
}

for (const instruction of instructionArr) {
  if (instruction === 'noop') {
    cycleNum++;
    if (cycleNum % 40 === 20) {
      addToSignalStrength();
    }
  } else {
      cycleNum++;
      if (cycleNum % 40 === 20) {
        addToSignalStrength();
        cycleNum++;
        xTotal += Number(instruction.split(' ')[1]);
      } else {
        cycleNum++;
        if (cycleNum % 40 === 20) {
          addToSignalStrength();
          xTotal += Number(instruction.split(' ')[1]);
        } else {
          xTotal += Number(instruction.split(' ')[1]);
        }
    }
  }
}

console.log(totalSignalStrength);
