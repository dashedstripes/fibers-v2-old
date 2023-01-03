import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild, addSiblingAfter, findNextSibling } from "../../src/tree";

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