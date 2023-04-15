const { Tree } = require("./task1");

describe("test task1", () => {
  let firstTree;
  let secondTree;

  beforeEach(() => {
    firstTree = new Tree();
    secondTree = new Tree();
  });

  test("Overall test Tree", () => {
    const firstNode = { key: 1, value: 5 };
    const secondNode = { key: 2, value: 3 };

    // Should insert Node as root
    firstTree.insertNode(firstNode.key, firstNode.value);

    expect(firstTree.root).not.toBeFalsy();
    expect(firstTree.root.children.length).toBe(0);
    expect(firstTree.root.key).toBe(firstNode.key);
    expect(firstTree.root.value).toBe(firstNode.value);
    expect(firstTree.root.parent).toBe(null);

    expect(firstTree.leafsNumber()).toBe(1);

    expect(firstTree.largestPath()).toEqual({
      maxDepth: 0,
      path: [firstNode.value],
    });

    // Should insert Node into existing Node
    firstTree.insertNode(secondNode.key, secondNode.value, firstNode.key);

    expect(firstTree.root.children.length).toBe(1);
    expect(firstTree.root.key).toBe(firstNode.key);
    expect(firstTree.root.value).toBe(firstNode.value);
    expect(firstTree.root.parent).toBe(null);
    expect(firstTree.root.children[0].key).toBe(secondNode.key);
    expect(firstTree.root.children[0].value).toBe(secondNode.value);
    expect(firstTree.root.children[0].parent).toBe(firstTree.root);
    expect(firstTree.root.children[0].children.length).toBe(0);

    expect(firstTree.leafsNumber()).toBe(1);

    expect(firstTree.largestPath()).toEqual({
      maxDepth: 1,
      path: [secondNode.value, firstNode.value],
    });

    // Should remove Node from existing Node
    firstTree.removeNode(secondNode.key);

    expect(firstTree.root).not.toBeFalsy();
    expect(firstTree.root.children.length).toBe(0);
    expect(firstTree.root.key).toBe(firstNode.key);
    expect(firstTree.root.value).toBe(firstNode.value);
    expect(firstTree.root.parent).toBe(null);

    expect(firstTree.leafsNumber()).toBe(1);

    expect(firstTree.largestPath()).toEqual({
      maxDepth: 0,
      path: [firstNode.value],
    });
  });

  test("Should check trees if it is equivalent", () => {
    const firstNode = { key: 1, value: 5 };
    const secondNode = { key: 2, value: 3 };

    firstTree.insertNode(firstNode.key, firstNode.value);
    firstTree.insertNode(secondNode.key, secondNode.value, firstNode.key);

    secondTree.insertNode(firstNode.key, firstNode.value);
    secondTree.insertNode(secondNode.key, secondNode.value, firstNode.key);

    expect(firstTree.isEquivalent(secondTree)).toBe(true);
    expect(secondTree.isEquivalent(firstTree)).toBe(true);

    firstTree.removeNode(secondNode.key);

    expect(firstTree.isEquivalent(secondTree)).toBe(false);
    expect(secondTree.isEquivalent(firstTree)).toBe(false);
  });
});
