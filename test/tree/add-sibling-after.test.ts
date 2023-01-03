import { buildDefaultTree, createTreeNodeId, createTreeNode, addSiblingAfter, addChild } from "../../src/tree";

test('should not add sibling after root', () => {
  const tree = buildDefaultTree();
  const id = createTreeNodeId();
  const node = createTreeNode(id, 'hello, world');
  const newTree = addSiblingAfter(tree, node, 'root');

  expect(newTree[id]).toBe(undefined);
})

test('should add sibling after any node below root', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');
  let newTree = addChild(tree, node1, 'root');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');
  newTree = addSiblingAfter(newTree, node2, node1Id);

  expect(newTree[node2Id].prevSibling).toBe(node1Id);
  expect(newTree[node2Id].parent).toBe('root');
})

test('should correctly organize siblings when adding sibling (after) inbetween nodes', () => {
  const defaultTree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let tree = addChild(defaultTree, node1, 'root');
  tree = addSiblingAfter(tree, node2, node1Id);

  // at this point, we should check it's been built correctly.

  expect(tree['root'].parent).toBe(null);
  expect(tree['root'].prevSibling).toBe(null);

  expect(tree[node1Id].parent).toBe('root');
  expect(tree[node1Id].prevSibling).toBe(null);

  expect(tree[node2Id].parent).toBe('root');
  expect(tree[node2Id].prevSibling).toBe(node1Id);

  // now we can get more complex by adding a node inbetween node1 and node2

  tree = addSiblingAfter(tree, node3, node1Id, node2Id);

  expect(tree['root'].parent).toBe(null);
  expect(tree['root'].prevSibling).toBe(null);

  expect(tree[node1Id].parent).toBe('root');
  expect(tree[node1Id].prevSibling).toBe(null);

  expect(tree[node3Id].parent).toBe('root');
  expect(tree[node3Id].prevSibling).toBe(node1Id);

  expect(tree[node2Id].parent).toBe('root');
  expect(tree[node2Id].prevSibling).toBe(node3Id);
})