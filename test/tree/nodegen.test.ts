import { createTreeNodeId, createTreeNode, buildDefaultTree } from "../../src/tree";

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