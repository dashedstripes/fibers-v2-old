import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild, indentRight, addSiblingAfter, indentLeft } from "../../src/tree";

test('should indent node left', () => {
  const tree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');  

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let newTree = addChild(tree, node1, 'root');
  newTree = addChild(newTree, node2, node1Id, null);
  newTree = addChild(newTree, node3, 'root', node1Id);

  // ensure tree is built correctly before indenting
  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);

  expect(newTree[node3Id].prevSibling).toBe(node1Id);
  expect(newTree[node3Id].parent).toBe('root');

  // indent node2 left
  newTree = indentLeft(newTree, node2Id, 'root', node1Id, node3Id);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(node1Id);
  expect(newTree[node2Id].parent).toBe('root');

  expect(newTree[node3Id].prevSibling).toBe(node2Id);
  expect(newTree[node3Id].parent).toBe('root');
})
