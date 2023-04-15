class Node {
  constructor(key, value, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  *preOrderSearch(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderSearch(child);
      }
    }
  }

  insertNode(key, value, parentNodeKey = null) {
    if (this.root == null) {
      this.root = new Node(key, value);
      return true;
    } else {
      for (let node of this.preOrderSearch()) {
        if (node.key === parentNodeKey) {
          node.children.push(new Node(key, value, node));
          return true;
        }
      }
    }
    return false;
  }

  removeNode(key) {
    for (let node of this.preOrderSearch()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  leafsNumber() {
    let result = 0;
    for (let node of this.preOrderSearch()) {
      if (node.children.length === 0) {
        result++;
      }
    }
    return result;
  }

  getDepth(node) {
    let depth = 0;
    let path = [];
    while (node.parent !== null) {
      depth++;
      path.push(node.value);
      node = node.parent;
    }
    return { depth, path };
  }

  largestPath() {
    let maxDepth = 0;
    let path = [];
    for (let node of this.preOrderSearch()) {
      if (node.children.length === 0) {
        const depth = this.getDepth(node);
        if (depth.depth > maxDepth) {
          maxDepth = depth.depth;
          path = depth.path;
        }
      }
    }
    path.push(this.root.value);
    return { maxDepth, path };
  }

  isEquivalent(tree) {
    const nodes1 = [...this.preOrderSearch()];
    const nodes2 = [...tree.preOrderSearch()];
    if (nodes1.length !== nodes2.length) return false;
    for (let i = 0; i < nodes1.length; i++) {
      if (nodes1[i].value !== nodes2[i].value) return false;
      if (nodes1[i].key !== nodes2[i].key) return false;
      if (nodes1[i].children.length !== nodes2[i].children.length) return false;
      for (let j = 0; j < nodes1[i].children.length; j++) {
        const child1 = nodes1[i].children[j];
        const child2 = nodes2[i].children[j];
        if (child1.value !== child2.value) return false;
        if (child1.key !== child2.key) return false;
      }
    }
    return true;
  }
}

function main() {
  const tree = new Tree();
  tree.insertNode(1, 5);
  tree.insertNode(2, 3, 1);
  tree.insertNode(3, 7, 1);
  tree.insertNode(4, 2, 2);
  tree.insertNode(5, 5, 2);
  tree.insertNode(6, 1, 3);
  tree.insertNode(7, 0, 3);
  tree.insertNode(8, 2, 7);
  tree.insertNode(9, 8, 7);
  tree.insertNode(10, 5, 9);

  const tree2 = new Tree();
  tree2.insertNode(1, 5);
  tree2.insertNode(2, 3, 1);
  tree2.insertNode(3, 7, 1);
  tree2.insertNode(4, 2, 2);
  tree2.insertNode(5, 5, 2);
  tree2.insertNode(6, 1, 3);
  tree2.insertNode(7, 0, 3);
  tree2.insertNode(8, 2, 7);
  tree2.insertNode(9, 8, 7);
  tree2.insertNode(10, 5, 9);

  console.log("Task 1");
  console.log("Zadanie 1: ", tree.leafsNumber());
  console.log("Zadanie 2: ", tree.largestPath());
  console.log("Zadanie 3: ", tree.isEquivalent(tree2));
}

module.exports = {
  Tree,
  main,
};
