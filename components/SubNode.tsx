import React from 'react';
import { findChildren, sortChildren, Tree } from '../src/tree';

interface Props {
  tree: Tree;
  id: string;
  parentId: string | null;
  prevSiblingId: string | null;
  nextSiblingId: string | null;
  onAddChild: (id: string, prevSibling: string | null) => void;
  onAddSiblingBefore: (id: string) => void;
  onAddSiblingAfter: (id: string, nextSiblingId: string) => void;
  onIndentRight: (id: string, newParentId: string, newPrevSiblingId: string | null, originalNextSiblingId: string | null) => void;
  onIndentLeft: (id: string, newParentId: string, newPrevSiblingId: string | null, newNextSiblingId: string | null) => void;
}

const SubNode: React.FC<Props> = ({ 
  tree, 
  id, 
  parentId,
  prevSiblingId,
  nextSiblingId,
  onAddChild,
  onAddSiblingBefore,
  onAddSiblingAfter,
  onIndentRight,
  onIndentLeft,
}) => {
  const children = findChildren(tree, id);
  const sortedChildren: string[] = sortChildren(tree, children);

  function handleIndentRight() {
    const prevSiblingChildren = findChildren(tree, prevSiblingId);
    const sortedPrevSiblingChildren: string[] = sortChildren(tree, prevSiblingChildren);
    onIndentRight(id, prevSiblingId, sortedPrevSiblingChildren[sortedPrevSiblingChildren.length - 1] || null, nextSiblingId)
  }

  function handleIndentLeft() {
    const grandparentChildren = findChildren(tree, tree[parentId]?.parent);
    const indexOfParent = grandparentChildren.findIndex((id) => id === parentId);

    console.log(grandparentChildren, tree);
    console.log(id, tree[parentId].parent, parentId, grandparentChildren[indexOfParent + 1])
    // onIndentLeft(id, tree[parentId].parent, parentId, grandparentChildren[indexOfParent + 1]);
  }

  return (
    <li>
      <span>{tree[id].id}</span>
      <button onClick={() => handleIndentLeft()}>Indent Left</button>
      <button onClick={() => onAddSiblingBefore(id)}>Add sibling before</button>
      <button onClick={() => onAddChild(id, sortedChildren[sortedChildren.length - 1])}>Add child</button>
      <button onClick={() => onAddSiblingAfter(id, nextSiblingId)}>Add sibling after</button>
      <button onClick={() => handleIndentRight()}>Indent Right</button>

      <ul>
        {sortedChildren?.map((child, index) => (
          <SubNode 
            key={child} 
            tree={tree} 
            id={child} 
            parentId={id}
            prevSiblingId={sortedChildren[index - 1] || null}
            nextSiblingId={sortedChildren[index + 1] || null}
            onAddChild={(id, prevSiblingId) => onAddChild(id, prevSiblingId)}
            onAddSiblingBefore={(id) => onAddSiblingBefore(id)}
            onAddSiblingAfter={(id, nextSiblingId) => onAddSiblingAfter(id, nextSiblingId)}
            onIndentRight={(id, newParentId, newPrevSiblingId, originalNextSiblingId) => onIndentRight(id, newParentId, newPrevSiblingId, originalNextSiblingId)}
            onIndentLeft={(id, newParentId, newPrevSiblingId, newNextSiblingId) => onIndentRight(id, newParentId, newPrevSiblingId, newNextSiblingId)}
          />
        ))}
      </ul>
    </li>
  )
}

export default SubNode;