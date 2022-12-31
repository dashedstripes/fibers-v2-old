type Tree = { [key: string]: TreeNode };

type TreeNode = {
  id: string
  value: string
  parent: string | null
  prevSibling: string | null
}

function createTreeNodeId() {
  return `${Math.floor(Math.random() * 40000)}-${Math.floor(Math.random() * 40000)}`;
}

function createTreeNode(id: string, value: string): TreeNode {
  return {
    id,
    value,
    parent: null,
    prevSibling: null,
  }
}

function buildDefaultTree() {
  const node = createTreeNode('root', 'root');
  let tree = {};
  tree = addChild(tree, node, null);
  return tree;
}

function addChild(tree: Tree, treeNode: TreeNode, nodeId: string | null): Tree {
  tree[treeNode.id] = treeNode;
  tree[treeNode.id].parent = nodeId;
  return tree;
}

function addSiblingAfter(tree: Tree, treeNode: TreeNode, nodeId: string): Tree {
  if(nodeId === 'root') {
    return tree;
  }

  tree[treeNode.id] = treeNode;
  tree[treeNode.id].prevSibling = nodeId;
  tree[treeNode.id].parent = tree[nodeId].parent;
  return tree
}

function addSiblingBefore(tree: Tree, treeNode: TreeNode, nodeId: string): Tree {
  if(nodeId === 'root') {
    return tree;
  }

  tree[treeNode.id] = treeNode;
  tree[nodeId].prevSibling = treeNode.id;
  tree[treeNode.id].parent = tree[nodeId].parent;
  return tree
}

export {
  buildDefaultTree,
  createTreeNodeId,
  createTreeNode,
  addChild,
  addSiblingAfter,
  addSiblingBefore,
}