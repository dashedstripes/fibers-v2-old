import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild, indentRight } from "../../src/tree";

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
  newTree = indentRight(tree, node2Id, node1Id);

  expect(newTree[node1Id].prevSibling).toBe(null);
  expect(newTree[node1Id].parent).toBe('root');

  expect(newTree[node2Id].prevSibling).toBe(null);
  expect(newTree[node2Id].parent).toBe(node1Id);
})

