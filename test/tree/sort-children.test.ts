import { buildDefaultTree, createTreeNodeId, createTreeNode, addChild, addSiblingAfter, findChildren, sortChildren, addSiblingBefore } from "../../src/tree";

test('should sort children correctly when adding siblings after', () => {
  const defaultTree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let tree = addChild(defaultTree, node1, 'root');
  tree = addSiblingAfter(tree, node2, node1Id);
  tree = addSiblingAfter(tree, node3, node2Id);

  const children = findChildren(tree, 'root');

  expect(sortChildren(tree, children)).toStrictEqual([node1Id, node2Id, node3Id]);
})

test('should sort children correctly when adding siblings before', () => {
  const defaultTree = buildDefaultTree();

  const node1Id = createTreeNodeId();
  const node1 = createTreeNode(node1Id, 'node1');

  const node2Id = createTreeNodeId();
  const node2 = createTreeNode(node2Id, 'node2');

  const node3Id = createTreeNodeId();
  const node3 = createTreeNode(node3Id, 'node3');

  let tree = addChild(defaultTree, node1, 'root');
  tree = addSiblingBefore(tree, node2, node1Id);
  tree = addSiblingBefore(tree, node3, node2Id);

  const children = findChildren(tree, 'root');
  const sortedChildren = sortChildren(tree, children);

  expect(children.includes(node1Id)).toBe(true);
  expect(children.includes(node2Id)).toBe(true);
  expect(children.includes(node3Id)).toBe(true);

  expect(sortedChildren).toStrictEqual([node3Id, node2Id, node1Id]);
})

test('should return original children if tree does not contain any child', () => {
  const children = ['one', 'two'];
  const sortedChildren = sortChildren({}, children);
  expect(sortedChildren).toStrictEqual(children);
})

test('should return empty array when sorting children if no children provided', () => {
  const sortedChildren = sortChildren({}, []);
  expect(sortedChildren).toStrictEqual([]);
})

test('should return empty array if invalid sortChildren params', () => {
  const sortedChildren = sortChildren(null, null);
  expect(sortedChildren).toStrictEqual([]);
})