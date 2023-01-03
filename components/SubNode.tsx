import React from 'react';
import { findChildren, sortChildren, Tree } from '../src/tree';

interface Props {
  tree: Tree;
  id: string;
  prevSiblingId: string;
  onAddChild: (id: string, prevSibling: string | null) => void;
  onAddSiblingBefore: (id: string) => void;
}

const SubNode: React.FC<Props> = ({ 
  tree, 
  id, 
  prevSiblingId,
  onAddChild,
  onAddSiblingBefore,
}) => {
  const children = findChildren(tree, id);
  const sortedChildren = sortChildren(tree, children);

  return (
    <li>
      <span>{tree[id].id}</span>
      <button onClick={() => onAddSiblingBefore(id)}>Add sibling before</button>
      <button onClick={() => onAddChild(id, sortedChildren[sortedChildren.length - 1])}>Add child</button>

      <ul>
        {sortedChildren?.map((child, index) => (
          <SubNode 
            key={child} 
            tree={tree} 
            id={child} 
            prevSiblingId={sortedChildren[index - 1] || null}
            onAddChild={(id, prevSiblingId) => onAddChild(id, prevSiblingId)}
            onAddSiblingBefore={(id) => onAddSiblingBefore(id)}
          />
        ))}
      </ul>
    </li>
  )
}

export default SubNode;