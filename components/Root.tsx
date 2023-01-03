import React, { useState } from 'react';
import { addChild, addSiblingBefore, buildDefaultTree, createTreeNode, createTreeNodeId, findChildren, sortChildren, Tree, TreeNode } from '../src/tree';
import SubNode from './SubNode';

const Root: React.FC = () => {
  const [tree, setTree] = useState<Tree>(buildDefaultTree());

  const children = findChildren(tree, 'root');
  const sortedChildren = sortChildren(tree, children);

  function handleAddChild(id: string, prevSibling: string | null) {
    const nid = createTreeNodeId();
    const n = createTreeNode(nid, 'child');
    const t = addChild({...tree}, n, id, prevSibling);
    setTree(t);
  }

  function handleAddSiblingBefore(id: string) {
    const nid = createTreeNodeId();
    const n = createTreeNode(nid, 'child');
    const t = addSiblingBefore({...tree}, n, id);
    setTree(t);
  }

  return (
    <ul>
      <li>
        <span>root</span>
        <ul>
          {sortedChildren?.map((child, index) => (
            <SubNode 
              key={child} 
              tree={tree}
              id={child} 
              prevSiblingId={sortedChildren[index - 1] || null}
              onAddChild={(id, prevSibling) => handleAddChild(id, prevSibling)}
              onAddSiblingBefore={(id) => handleAddSiblingBefore(id)}
            />
          ))}
          <button onClick={() => handleAddChild('root', sortedChildren[sortedChildren.length - 1])}>Add Child</button>
        </ul>
      </li>
    </ul>
  )
}

export default Root;