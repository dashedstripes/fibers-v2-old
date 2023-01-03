import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild, indentRight, addSiblingAfter } from "../../src/tree";

test('should indent node right', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');  

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  let newTree = addChild(tree, node1, 'root');
  newTree = addChild(newTree, node2, 'root', node1Id);

  // make sure the children were set correctly

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(node1Id);
  expect(newTree[node2Id].parent).toBe('root');

  // indent the node right once
  newTree = indentRight(tree, node2Id, node1Id, null, null);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);
})

test('root node should not indent right', () => {
  const tree = buildDefaultTree();

  // indent the node right once
  const newTree = indentRight(tree, 'root', null, null, null);

  expect(newTree['root'].prevSibling).toBe(null);
  expect(newTree['root'].parent).toBe(null);
})

test('first child should not indent right', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  let newTree = addChild(tree, node1, 'root');

  // ensure tree is built correctly
  expect(newTree['root'].prevSibling).toBe(null);
  expect(newTree['root'].parent).toBe(null);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  newTree = indentRight(tree, node1Id, 'root', null, null);

  expect(newTree['root'].prevSibling).toBe(null);
  expect(newTree['root'].parent).toBe(null);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');
})

test('should return original tree if newParentId is null', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  let newTree = addChild(tree, node1, 'root');

  // ensure tree is built correctly
  expect(newTree['root'].prevSibling).toBe(null);
  expect(newTree['root'].parent).toBe(null);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  newTree = indentRight(tree, node1Id, null, null, null);

  expect(newTree['root'].prevSibling).toBe(null);
  expect(newTree['root'].parent).toBe(null);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');
})

test('should correctly indent right middle child', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');  

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let newTree = addChild(tree, node1, 'root');
  newTree = addChild(newTree, node2, 'root', node1Id);
  newTree = addChild(newTree, node3, 'root', node2Id);

  // make sure the children were set correctly

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(node1Id);
  expect(newTree[node2Id].parent).toBe('root');

  expect(newTree[node3Id].prevSibling).toBe(node2Id);
  expect(newTree[node3Id].parent).toBe('root');

  // indent node2

  newTree = indentRight(tree, node2Id, node1Id, null, node3Id);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);

  expect(newTree[node3Id].prevSibling).toBe(node1Id);
  expect(newTree[node3Id].parent).toBe('root');
})

test('should become last child of previous sibling when indent right', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');  

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let newTree = addChild(tree, node1, 'root');
  newTree = addChild(newTree, node2, node1Id, null);
  newTree = addSiblingAfter(newTree, node3, node1Id);

  // make sure the tree were set correctly

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);

  expect(newTree[node3Id].prevSibling).toBe(node1Id);
  expect(newTree[node3Id].parent).toBe('root');

  // indent node3 right
  newTree = indentRight(tree, node3Id, node1Id, node2Id, null)

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);

  expect(newTree[node3Id].prevSibling).toBe(node2Id);
  expect(newTree[node3Id].parent).toBe(node1Id);
})