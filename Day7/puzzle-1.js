// create a tree class and use give it methods to add/traverse
const sampleData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const fileSystemArr = sampleData.split('\n');


class Tree {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  addNode(node) {
    if (node instanceof Tree) {
      this.children.push(node);
    } else {
      this.children.push(new Tree(node));
    }
  }

  // findNode(node) {
  //   // console.log('TOP CONSOLE LOG: ', this.data);
  //   if (this.children.includes(node)) {
  //     // console.log('CONSOLE LOG IN IF: ', this.data);
  //     return node;
  //   }
  //   this.children.forEach(child => child.findNode(node));
  // }

  findNode(node) {
    if (node === this.data) {
      return this;
    }
    this.children.forEach(child => {
      if (node instanceof Tree) {
        if (child === node) {
          return child;
        }
      } else if (!(node instanceof Tree)) {
        if (child.data === node) {
          return child;
        }
      }
    })
  }

}

let fileSystem;



//ACTIONS TAKEN ALL START WITH $ SO THAT MIGHT BE A WAY TO
let currentPosition;
let lsArr = [];
let nextLine = '';
for (let i = 0; i < fileSystemArr.length; i++) {
  const currentLineSplit = fileSystemArr[i].split(' ');
  if (currentLineSplit.includes('/')) {
    fileSystem = new Tree('/');
    currentPosition = '/';
  } else if (currentLineSplit.includes('$')) {
    if (currentLineSplit.includes('ls')) {
      lsArr.push(fileSystemArr[i + 1]);
      while (!nextLine.includes('$')) {
        i++;
        nextLine = fileSystemArr[i + 1];
        if (!nextLine.includes('$')) {
          lsArr.push(nextLine);
        }
      }
    }
    for (let j = 0; j < lsArr.length; j++) {
      if (!fileSystem.findNode(currentPosition)) {
        fileSystem.addNode(lsArr[j]);
      } else {
        console.log(fileSystem.findNode(currentPosition));
        fileSystem.findNode(currentPosition).addNode(lsArr[j]);
      }
    }
    lsArr = [];
  }
}


console.log(fileSystem);
