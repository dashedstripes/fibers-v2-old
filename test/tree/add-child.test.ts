import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild } from "../../src/tree";

test('should add child after root node', () => {
  const tree = buildDefaultTree();
  const id = createTreeNodeId();
  const node = createTreeNode(id, 'hello, world');
  const newTree = addChild(tree, node, 'root');

  expect(newTree[id].parent).toBe('root');
  expect(newTree[id].prevSibling).toBe(null);
})

test('should add multiple children after root node', () => {
  const tree = buildDefaultTree();

  const n1id = createTreeNodeId();
  const n1 = createTreeNode(n1id, 'n1');

  const n2id = createTreeNodeId();
  const n2 = createTreeNode(n2id, 'n2');

  const n3id = createTreeNodeId();
  const n3 = createTreeNode(n3id, 'n3');

  let newTree = addChild(tree, n1, 'root');
  newTree = addChild(tree, n2, 'root', n1id);
  newTree = addChild(tree, n3, 'root', n2id);

  expect(newTree[n1id].parent).toBe('root');
  expect(newTree[n1id].prevSibling).toBe(null);

  expect(newTree[n2id].parent).toBe('root');
  expect(newTree[n2id].prevSibling).toBe(n1id);

  expect(newTree[n3id].parent).toBe('root');
  expect(newTree[n3id].prevSibling).toBe(n2id);
})


test('should add nested children', () => {
  const defaultTree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let tree = addChild(defaultTree, node1, 'root');
  tree = addChild(tree, node2, node1Id);
  tree = addChild(tree, node3, node2Id);

  expect(tree['root'].parent).toBe(null);
  expect(tree['root'].prevSibling).toBe(null);

  expect(tree[node1Id].parent).toBe('root');
  expect(tree[node1Id].prevSibling).toBe(null);

  expect(tree[node2Id].parent).toBe(node1Id);
  expect(tree[node2Id].prevSibling).toBe(null);

  expect(tree[node3Id].parent).toBe(node2Id);
  expect(tree[node3Id].prevSibling).toBe(null);
})

test('should add child to end of children', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');  

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let newTree = addChild(tree, node1, 'root');
  newTree = addChild(newTree, node2, node1Id);
  newTree = addChild(newTree, node3, node1Id, node2Id);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);

  expect(newTree[node3Id].prevSibling).toBe(node2Id);
  expect(newTree[node3Id].parent).toBe(node1Id);
})