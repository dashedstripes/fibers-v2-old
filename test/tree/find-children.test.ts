import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild, addSiblingAfter, findChildren } from "../../src/tree";

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

test('should return original array if id is null', () => {
  const defaultTree = buildDefaultTree();
  const foundChildren = findChildren(defaultTree, null);
  expect(foundChildren.length).toBe(0);
})