import React, { useState } from 'react';
import { addChild, addSiblingAfter, addSiblingBefore, buildDefaultTree, createTreeNode, createTreeNodeId, findChildren, indentLeft, indentRight, sortChildren, Tree } from '../src/tree';
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
    const n = createTreeNode(nid, 'sibling-before');
    const t = addSiblingBefore({...tree}, n, id);
    setTree(t);
  }

  function handleAddSiblingAfter(id: string, nextSiblingId: string) {
    const nid = createTreeNodeId();
    const n = createTreeNode(nid, 'sibling-after');
    const t = addSiblingAfter({...tree}, n, id, nextSiblingId);
    setTree(t);
  }

  function handleIndentRight(
    id: string, 
    newParentId: string, 
    newPrevSiblingId: string | null, 
    originalNextSiblingId: string | null
  ) {
    const t = indentRight({...tree}, id, newParentId, newPrevSiblingId, originalNextSiblingId);
    setTree(t);
  }

  function handleIndentLeft(
    id: string, 
    newParentId: string, 
    newPrevSiblingId: string | null, 
    nextSiblingId: string | null
  ) {
    const t = indentLeft({...tree}, id, newParentId, newPrevSiblingId, nextSiblingId);
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
              parentId={'root'}
              prevSiblingId={sortedChildren[index - 1] || null}
              nextSiblingId={sortedChildren[index + 1] || null}
              onAddChild={(id, prevSibling) => handleAddChild(id, prevSibling)}
              onAddSiblingBefore={(id) => handleAddSiblingBefore(id)}
              onAddSiblingAfter={(id, nextSiblingId) => handleAddSiblingAfter(id, nextSiblingId)}
              onIndentRight={(id, newParentId, newPrevSiblingId, originalNextSiblingId) => handleIndentRight(id, newParentId, newPrevSiblingId, originalNextSiblingId)}
              onIndentLeft={(id, newParentId, newPrevSiblingId, newNextSiblingId) => handleIndentLeft(id, newParentId, newPrevSiblingId, newNextSiblingId)}
            />
          ))}
          <button onClick={() => handleAddChild('root', sortedChildren[sortedChildren.length - 1])}>Add Child</button>
        </ul>
      </li>
    </ul>
  )
}

export default Root;