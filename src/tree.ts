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

function findNextSibling(tree: Tree, nodeId: string): string | null{
  for(const key of Object.keys(tree)) {
    if(tree[key].prevSibling === nodeId) {
      return key;
    }
  }

  return null;
}

function addSiblingAfter(tree: Tree, treeNode: TreeNode, nodeId: string, nextSiblingId?: string | null): Tree {
  if(nodeId === 'root') {
    return tree;
  }

  tree[treeNode.id] = treeNode;
  tree[treeNode.id].prevSibling = nodeId;
  tree[treeNode.id].parent = tree[nodeId].parent;

  if(nextSiblingId) {
    tree[nextSiblingId].prevSibling = treeNode.id;
  }
  
  return tree
}

function addSiblingBefore(tree: Tree, treeNode: TreeNode, nodeId: string): Tree {
  if(nodeId === 'root') {
    return tree;
  }

  const prevSiblingId = tree[nodeId].prevSibling;

  tree[treeNode.id] = treeNode;
  tree[nodeId].prevSibling = treeNode.id;
  tree[treeNode.id].parent = tree[nodeId].parent;

  if(prevSiblingId) {
    tree[treeNode.id].prevSibling = prevSiblingId;
  }
  return tree
}

function findChildren(tree: Tree, nodeId: string): string[] {
  let children = [];

  for(const key of Object.keys(tree)) {
    if(tree[key].parent === nodeId) {
      children.push(key);
    }
  }

  return children;
}

export {
  buildDefaultTree,
  createTreeNodeId,
  createTreeNode,
  addChild,
  addSiblingAfter,
  addSiblingBefore,
  findNextSibling,
  findChildren,
}