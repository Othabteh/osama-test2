class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  preOrder() {
    let values = [];
    let node = this.root;
    if (!node) return 'The Tree is Empty';
    let _walk = (node) => {
      values.push(node.value);
      if (node.left) _walk(node.left);
      if (node.right) _walk(node.right);
    };
    _walk(node);
    return values;
  }
  inOrder() {
    let values = [];
    let node = this.root;
    if (!node) return 'empty tree';
    let Walk = (node) => {
      if (node.left) Walk(node.left);
      values.push(node.value);
      if (node.right) Walk(node.right);
    };
    Walk(node);
    return values;
  }
  postOrder() {
    let values = [];
    let node = this.root;
    if (!node) return 'empty tree';
    let Walk = (node) => {
      if (node.left) Walk(node.left);
      if (node.right) Walk(node.right);
      values.push(node.value);
    };
    Walk(node);
    return values;
  }
  findMax() {
    let node = this.root;
    let arr = this.preOrder();
    let max = this.root.value;
    if (!node) return 'empty tree';
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }

  levelOrder() {
    let result = [];
    let Q = [];
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        result.push(node.value);
        if (node.left != null) {
          Q.push(node.left);
        }
        if (node.right != null) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }
  breadthFirst() {
    let current = this.root;
    let results = [];
    let nodeArr = [];
    let count = -1;
    results.push(current.value);
    const Walk = (node) => {
      if (node === undefined) {
        return results;
      }
      count++;
      if (node.left) {
        results.push(node.left.value);
        nodeArr.push(node.left);
      }
      if (node.right) {
        results.push(node.right.value);
        nodeArr.push(node.right);
      }
      Walk(nodeArr[count]);
    };
    Walk(this.root);
    return results;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  add(data) {
    const node = this.root;
    if (!node) {
      this.root = new Node(data);
      return this.root;
    } else {
      const searchTree = (node) => {
        if (data < node.value) {
          if (!node.left) {
            node.left = new Node(data);
            return node;
          } else if (node.left) {
            return searchTree(node.left);
          }
        } else if (data > node.value) {
          if (!node.right) {
            node.right = new Node(data);
          } else if (node.right) {
            return searchTree(node.right);
          }
        } else {
          return 'this.value is exist';
        }
      };
      return searchTree(node);
    }
  }

  contains(data) {
    let current = this.root;
    while (current) {
      if (data === current.value) {
        return true;
      } else if (data < current.value) {
        current = current.left;
      } else if (data > current.value) {
        current = current.right;
      }
    }
    return false;
  }
  maxValue() {
    let current = this.root;
    if (!current) return 'empty tree';
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  beforeMax() {
    let max = this.root.value;
    let beforeMax = this.root.left ? this.root.left.value : this.root.val;
    const Walk = (node) => {
      if (node.value > max) {
        beforeMax = max;
        max = node.value;
      }
      if (node.value > beforeMax && node.value < max) {
        beforeMax = node.value;
      }
      if (node.right) Walk(node.right);
      if (node.left) Walk(node.left);
    };
    if (!this.root.left && !this.root.right) {
      throw 'err';
    }
    Walk(this.root);
    return beforeMax;
  }
  remove(value) {
    const removeNode = (node, value) => {
      if (node == null) {
        return null;
      }
      if (node.value == value) {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }
        node.value = tempNode.value;
        node.right = removeNode(node.right, tempNode.value);
        return node;
      } else if (node.value > value) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    };
    removeNode(this.root, value);
  }
}

function sumation(Bst) {
  let current = Bst.root;
  let count = 0;
  //   count = count + current.value;

  const Walk = (node) => {
    check(node.value);
    if (node.left) {
      Walk(node.left);
    }
    if (node.right) Walk(node.right);
  };
  Walk(Bst.root);
  return count;
  function check(value) {
    if (value % 2 !== 0) {
      count = count + value;
    }
  }
}

function filesCheck(dir1, dir2) {
  let obj = { sum1: 0, sum2: 0 };
  const _walk = (node, sum) => {
    if (node.left) {
      _walk(node.left, sum);
    }
    if (node.right) {
      _walk(node.right, sum);
    }
    if (!node.left && !node.right) {
      obj[sum] = obj[sum] + 1;
    }
  };
  _walk(dir1, sum1);
  _walk(dir2, sum2);

  return obj.sum1 === obj.sum2;
}

// const one = new Node(9);
// const two = new Node(4);
// const three = new Node(17);
// const four = new Node(3);
// const five = new Node(6);
// const six = new Node(10);
// const seven = new Node(22);
// const eight = new Node(5);
// const nine = new Node(7);
// const ten = new Node(20);

// one.left = two;
// one.right = three;
// two.left = four;
// two.right = five;
// five.left = eight;
// five.right = nine;
// three.left = six;
// three.right = seven;
// seven.left = ten;

// const tree = new BinaryTree(one);
// console.log(sumation(tree));
// // console.log(tree.breadthFirstTraversal());
// console.log(tree.breadthFirst());

const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);
bst.add(10);

console.log(bst.beforeMax());

class Node2 {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class kTree {
  constructor(root = null) {
    this.root = root;
  }
}

function FizzBuzzTree(kTree) {
  if (!kTree.root) {
    throw 'Empty tree';
  }

  kTree.root.value = check(kTree.root.value);
  console.log(check(kTree.root.value));

  const _walk = (node) => {
    node.children.forEach((child) => {
      check(child.value);
      console.log(check(child.value));
      _walk(child);
    });
  };

  _walk(kTree.root);

  function check(value) {
    if (value % 5 == 0 && value % 3 == 0) {
      return 'FizzBuzz';
    } else if (value % 5 == 0) {
      return 'Buzz';
    } else if (value % 3 == 0) {
      return 'Fizz';
    } else {
      return `${value}`;
    }
  }
  return kTree;
}

// const one = new Node2(15);
// const two = new Node2(3);
// const three = new Node2(5);
// const four = new Node2(9);
// const five = new Node2(15);
// const six = new Node2(7);

// one.children.push(two, three, four, five);
// four.children.push(six);

// const tree = new kTree(one);
// console.log(FizzBuzzTree(tree));
