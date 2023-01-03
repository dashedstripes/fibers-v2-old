import React from 'react';
import { findChildren, sortChildren, Tree } from '../src/tree';

interface Props {
  tree: Tree;
  id: string;
  prevSiblingId: string | null;
  nextSiblingId: string | null;
  onAddChild: (id: string, prevSibling: string | null) => void;
  onAddSiblingBefore: (id: string) => void;
  onAddSiblingAfter: (id: string, nextSiblingId: string) => void;
  onIndentRight: (id: string, newParentId: string, newPrevSiblingId: string | null, originalNextSiblingId: string | null) => void;
}

const SubNode: React.FC<Props> = ({ 
  tree, 
  id, 
  prevSiblingId,
  nextSiblingId,
  onAddChild,
  onAddSiblingBefore,
  onAddSiblingAfter,
  onIndentRight,
}) => {
  const children = findChildren(tree, id);
  const sortedChildren: string[] = sortChildren(tree, children);

  function handleIndentRight() {
    const prevSiblingChildren = findChildren(tree, prevSiblingId);
    const sortedPrevSiblingChildren: string[] = sortChildren(tree, prevSiblingChildren);
    onIndentRight(id, prevSiblingId, sortedPrevSiblingChildren[sortedPrevSiblingChildren.length - 1] || null, nextSiblingId)
  }

  return (
    <li>
      <span>{tree[id].id}</span>
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
            prevSiblingId={sortedChildren[index - 1] || null}
            nextSiblingId={sortedChildren[index + 1] || null}
            onAddChild={(id, prevSiblingId) => onAddChild(id, prevSiblingId)}
            onAddSiblingBefore={(id) => onAddSiblingBefore(id)}
            onAddSiblingAfter={(id, nextSiblingId) => onAddSiblingAfter(id, nextSiblingId)}
            onIndentRight={(id, newParentId, newPrevSiblingId, originalNextSiblingId) => onIndentRight(id, newParentId, newPrevSiblingId, originalNextSiblingId)}
          />
        ))}
      </ul>
    </li>
  )
}

export default SubNode;