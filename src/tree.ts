export type Tree = { [key: string]: TreeNode };

export type TreeNode = {
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

function addChild(tree: Tree, treeNode: TreeNode, nodeId: string | null, prevSiblingId?: string | null): Tree {
  tree[treeNode.id] = treeNode;
  tree[treeNode.id].parent = nodeId;

  if(prevSiblingId) {
    tree[treeNode.id].prevSibling = prevSiblingId;
  }

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

function sortChildren(tree: Tree, children: string[]): string[] {
  if(!tree && !children) {
    return [];
  }
  
  let sorted = [];
  let last = null;

  while(sorted.length < children.length) {
    for(const key of children) {
      if(!tree.hasOwnProperty(key)) {
        return children;
      }

      if(tree[key].prevSibling === last) {
        sorted.push(key);
        last = key;
      }
    }
  }

  return sorted;
}

function indentRight(
  tree: Tree, 
  id: string, 
  newParentId: string | null, 
  newPrevSiblingId: string | null, 
  originalNextSiblingId: string | null
) {
  if(!newParentId) {
    return tree;
  }
  
  tree[id].parent = newParentId;
  tree[id].prevSibling = newPrevSiblingId;

  if(originalNextSiblingId) {
    tree[originalNextSiblingId].prevSibling = newParentId;
  }
  return tree;
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
  sortChildren,
  indentRight,
}