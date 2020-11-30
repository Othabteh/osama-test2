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

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }
  findMinHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
}

function oddSum(Bst) {
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

function sameTree(tree1, tree2) {
  let node1 = tree1.root;
  let node2 = tree2.root;
  let arr1 = [];
  let arr2 = [];
  const _walk = (node, arr) => {
    arr.push(node.value);
    if (node.left) {
      _walk(node.left, arr);
    } else {
      arr.push(null);
    }
    if (node.right) {
      _walk(node.right, arr);
    } else {
      arr.push(null);
    }
  };
  _walk(node1, arr1);
  _walk(node2, arr2);
  return check(arr1, arr2);

  function check(arr1, arr2) {
    let count = 0;
    if (arr1.length == arr2.length) {
      while (arr1[count] == arr2[count] && count < arr1.length) {
        count++;
      }
      if (count == arr1.length) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function symmetricTree(tree) {
  let answer = true;
  const _walk = (node1, node2) => {
    if ((!node1 && !node2) || !answer) {
      return;
    }
    if (!node1 || !node2) {
      answer = false;
      return;
    }
    if (node1.value !== node2.value) {
      answer = false;
      return;
    }
    _walk(node1.left, node2.right);
    _walk(node1.right, node2.left);
  };
  _walk(tree.root.left, tree.root.right);
  return answer;
}

function maxDepth(tree) {
  let maxValue = 1;
  const _walk = (node, value) => {
    if (value > maxValue) {
      maxValue = value;
    }
    if (node.left) _walk(node.left, value + 1);
    if (node.right) _walk(node.right, value + 1);
  };
  _walk(tree.root, maxValue);
  return maxValue;
}
function levelOrder(tree) {
  let levelArr = [];
  const _walk = (node, value) => {
    value++;
    if (!levelArr[value]) {
      levelArr[value] = [];
    }
    levelArr[value].push(node.value);
    if (node.left) _walk(node.left, value);
    if (node.right) _walk(node.right, value);
  };
  _walk(tree.root, 0);
  return levelArr.reverse();
}
function BstConverter(arr) {
  let mid = Math.ceil(arr.length / 2);

  let node = new Node(arr[mid]);
  let count = 0;
  const _walk = (node) => {
    while (count < arr) {
      if (arr[count] < node.value) {
        if (!node.left) {
          node.left = new Node(arr[count]);
          count++;
        } else if (node.left) {
          _walk(node.left);
        }
      } else if (arr[count] > node.value) {
        if (!node.right) {
          node.right = new Node(arr[count]);
          count++;
        } else if (node.right) {
          _walk(node.right);
        }
      } else {
        return 'exisit value';
      }
    }
    return node;
  };
  return _walk(node);
}
// function sortedArrayToBST(arr) {
//   const _walk = (arr, left, right) => {
//     if (left > right) return null;
//     let mid = Math.ceil((left + right) / 2);
//     let node = new Node(arr[mid]);
//     node.left = _walk(arr, left, mid - 1);
//     node.right = _walk(arr, mid + 1, right);
//     return node;
//   };
//   return _walk(arr, 0, arr.length - 1);
// }
function BstConverter(arr) {
  const _walk = (arr, left, right) => {
    if (left > right) return null;
    let mid = Math.ceil((left + right) / 2);
    let node = new Node(arr[mid]);
    node.left = _walk(arr, left, mid - 1);
    node.right = _walk(arr, mid + 1, right);
    return node;
  };
  return _walk(arr, 0, arr.length - 1);
}

function treeBalance(tree) {
  return minHight(tree.root) >= maxHight(tree.root) - 1;
}

const minHight = (node) => {
  if (!node) {
    return -1;
  }
  let left = minHight(node.left);
  let right = minHight(node.right);
  if (left < right) {
    return left + 1;
  } else {
    return right + 1;
  }
};
const maxHight = (node) => {
  if (!node) {
    return -1;
  }
  let left = maxHight(node.left);
  let right = maxHight(node.right);
  if (left > right) {
    return left + 1;
  } else {
    return right + 1;
  }
};

function minDepth(tree) {
  let minDepth;
  const _walk = (node, value) => {
    value++;
    if (node.left) _walk(node.left, value);
    if (node.right) _walk(node.right, value);
    if (!node.left && !node.right && (!minDepth || value < minDepth)) {
      minDepth = value;
    }
  };
  _walk(tree.root, 0);
  return minDepth;
}

function pathSum(tree, sumValue) {
  let answer = false;

  const _walk = (node, sum) => {
    sum += node.value;
    if (node.left) _walk(node.left, sum);
    if (node.right) _walk(node.right, sum);
    if (!node.left && !node.right && sum == sumValue) {
      answer = true;
    }
  };
  _walk(tree.root, 0);
  return answer;
}

function paths(tree, sumValue) {
  let pathArr = [];
  const _walk = (node, sum, path) => {
    sum += node.value;
    if (node.left) {
      _walk(node.left, sum, [...path, node.left.value]);
    }
    if (node.right) {
      _walk(node.right, sum, [...path, node.right.value]);
    }
    if (!node.left && !node.right && sum == sumValue) {
      pathArr.push(path);
    }
  };
  _walk(tree.root, 0, [tree.root.value]);
  return pathArr;
}
function beforeMax(tree) {
  let max = tree.root.value;
  let beforeMax = tree.root.left ? tree.root.left.value : tree.root.value;
  const _walk = (node) => {
    if (node.value > max) {
      beforeMax = max;
      max = node.value;
    }
    if (max > node.value && node.value > beforeMax) {
      beforeMax = node.value;
    }
    if (node.left) {
      _walk(node.left);
    }
    if (node.right) {
      _walk(node.right);
    }
  };
  _walk(tree.root);
  return beforeMax;
}
function treeInverter(tree) {
  let newTree = new BinaryTree();
  const _walk = (node) => {
    let newNode = new Node(node.value);

    if (node.left) {
      newNode.right = _walk(node.left);
    }
    if (node.right) {
      newNode.left = _walk(node.right);
    }
    return newNode;
  };
  newTree.root = _walk(tree.root);
  return newTree;
}

function mergrTrees(t1, t2) {
  const tree = new BinaryTree();
  const _walk = (node1, node2) => {
    if (!node1 && !node2) return null;
    let newNode = new Node(node1 ? node1.value : 0 + node2 ? node2.value : 0);
    newNode.left = _walk(node1 ? node1.left : null, node2 ? node2.left : null);
    newNode.right = _walk(node1 ? node1.right : null, node2 ? node2.right : null);
    return newNode;
  };
  tree.root = _walk(t1.root, t2.root);
  return tree;
}

const one = new Node(1);
const two = new Node(3);
const three = new Node(2);
const four = new Node(5);
// const five = new Node(6);
// const six = new Node(10);
// const seven = new Node(22);
// const eight = new Node(5);
// const nine = new Node(5);
// const ten = new Node(20);

one.left = two;
one.right = three;
two.left = four;
// two.right = five;
// five.left = eight;
// five.right = nine;
// three.left = six;
// three.right = seven;
// seven.left = ten;

const one1 = new Node(2);
const two1 = new Node(1);
const three1 = new Node(3);
const four1 = new Node(4);
const five1 = new Node(7);
// const six1 = new Node(6);
// const seven1 = new Node(9);
// const eight1 = new Node(2);
// const nine1 = new Node(1);
// const ten1 = new Node(5);

one1.left = two1;
one1.right = three1;
// two1.left = four1;
two1.right = four1;
// four1.left = seven1;
// four1.right = eight1;
// three1.left = six1;
three1.right = five1;
// six1.right = nine1;
// six1.left = ten1;

// seven1.right = nine1;

const tree = new BinaryTree(one);
const tree2 = new BinaryTree(one1);
// console.log(sameTree(tree, tree2));
// console.log(symmetricTree(tree2));
// console.log(maxDepth(tree2));
// console.log(levelOrder(tree2));
// let arr2 = [-10, -3, 0, 5, 9];
// console.log(BstConverter(arr2));
// console.log(treeBalance(tree2));
// console.log(minDepth(tree2));
// console.log(pathSum(tree2, 22));
// console.log(paths(tree2, 22));
// console.log(beforeMax(tree2));
// console.log(treeInverter(tree2));
console.log(mergrTrees(tree, tree2));

// console.log(oddSum(tree));
// // console.log(tree.breadthFirstTraversal());
// console.log(tree.breadthFirst());

// const bst = new BST();

// bst.add(9);
// bst.add(4);
// bst.add(17);
// bst.add(3);
// bst.add(6);
// bst.add(22);
// bst.add(5);
// bst.add(7);
// bst.add(20);
// bst.add(10);

// console.log(bst.findMinHeight(bst.roots));

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
