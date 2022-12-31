import { 
  addChild, 
  addSiblingAfter, 
  addSiblingBefore, 
  buildDefaultTree, 
  createTreeNode, 
  createTreeNodeId 
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

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');
  newTree = addSiblingBefore(newTree, node2, node1Id);

  expect(newTree[node1Id].prevSibling).toBe(node2Id);
  expect(newTree[node2Id].parent).toBe('root');
})