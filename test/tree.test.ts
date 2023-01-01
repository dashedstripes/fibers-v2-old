import { 
  addChild, 
  addSiblingAfter, 
  addSiblingBefore, 
  buildDefaultTree, 
  createTreeNode, 
  createTreeNodeId, 
  findChildren, 
  findNextSibling,
} from '../src/tree';

test('should generate id', () => {
  const id = createTreeNodeId();
  expect(typeof id).toBe('string');
})

test('should build a tree node', () => {
  const id = createTreeNodeId();
  const node = createTreeNode(id, 'hello, world');
  expect(node).toStrictEqual({ id, value: 'hello, world', parent: null, prevSibling: null})
})

test('should build default tree', () => {
  const tree = buildDefaultTree();
  expect(tree['root']).toStrictEqual({ id: 'root', value: 'root', parent: null, prevSibling: null})
})

test('should add child after root node', () => {
  const tree = buildDefaultTree();
  const id = createTreeNodeId();
  const node = createTreeNode(id, 'hello, world');
  const newTree = addChild(tree, node, 'root');

  expect(newTree[id].parent).toBe('root');
})

test('should not add sibling after root', () => {
  const tree = buildDefaultTree();
  const id = createTreeNodeId();
  const node = createTreeNode(id, 'hello, world');
  const newTree = addSiblingAfter(tree, node, 'root');

  expect(newTree[id]).toBe(undefined);
})

test('should not add sibling before root', () => {
  const tree = buildDefaultTree();
  const id = createTreeNodeId();
  const node = createTreeNode(id, 'hello, world');
  const newTree = addSiblingBefore(tree, node, 'root');

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

test('should add sibling before any node below root', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');
  let newTree = addChild(tree, node1, 'root');
  const n1PrevSibling = newTree[node1Id].prevSibling;

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');
  newTree = addSiblingBefore(newTree, node2, node1Id);

  expect(newTree[node2Id].prevSibling).toBe(n1PrevSibling);
  expect(newTree[node2Id].parent).toBe('root');

  expect(newTree[node1Id].prevSibling).toBe(node2Id);
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

test('should correctly organize siblings when adding sibling (before) inbetween nodes', () => {
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

  tree = addSiblingBefore(tree, node3, node2Id);

  expect(tree['root'].parent).toBe(null);
  expect(tree['root'].prevSibling).toBe(null);

  expect(tree[node1Id].parent).toBe('root');
  expect(tree[node1Id].prevSibling).toBe(null);

  expect(tree[node3Id].parent).toBe('root');
  expect(tree[node3Id].prevSibling).toBe(node1Id);

  expect(tree[node2Id].parent).toBe('root');
  expect(tree[node2Id].prevSibling).toBe(node3Id);
})

test('should return next sibling id, if one exists', () => {
  const defaultTree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  let tree = addChild(defaultTree, node1, 'root');
  tree = addSiblingAfter(tree, node2, node1Id);

  expect(findNextSibling(tree, node1Id)).toBe(node2Id);
  expect(findNextSibling(tree, node2Id)).toBe(null);
})

test('should find children for a given node', () => {
  const defaultTree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  let tree = addChild(defaultTree, node1, 'root');
  tree = addSiblingAfter(tree, node2, node1Id);

  const foundChildren = findChildren(tree, 'root');

  expect(foundChildren.length).toBe(2);
  expect(foundChildren).toContain(node1Id);
  expect(foundChildren).toContain(node2Id);
})