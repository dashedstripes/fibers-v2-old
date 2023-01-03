import React from 'react';
import { findChildren, sortChildren, Tree } from '../src/tree';

interface Props {
  tree: Tree;
  id: string;
  nextSiblingId: string | null;
  onAddChild: (id: string, prevSibling: string | null) => void;
  onAddSiblingBefore: (id: string) => void;
  onAddSiblingAfter: (id: string, nextSiblingId: string) => void;
}

const SubNode: React.FC<Props> = ({ 
  tree, 
  id, 
  nextSiblingId,
  onAddChild,
  onAddSiblingBefore,
  onAddSiblingAfter,
}) => {
  const children = findChildren(tree, id);
  const sortedChildren: string[] = sortChildren(tree, children);

  return (
    <li>
      <span>{tree[id].id}</span>
      <button onClick={() => onAddSiblingBefore(id)}>Add sibling before</button>
      <button onClick={() => onAddChild(id, sortedChildren[sortedChildren.length - 1])}>Add child</button>
      <button onClick={() => onAddSiblingAfter(id, nextSiblingId)}>Add sibling after</button>

      <ul>
        {sortedChildren?.map((child, index) => (
          <SubNode 
            key={child} 
            tree={tree} 
            id={child} 
            nextSiblingId={sortedChildren[index + 1]}
            onAddChild={(id, prevSiblingId) => onAddChild(id, prevSiblingId)}
            onAddSiblingBefore={(id) => onAddSiblingBefore(id)}
            onAddSiblingAfter={(id, nextSiblingId) => onAddSiblingAfter(id, nextSiblingId)}
          />
        ))}
      </ul>
    </li>
  )
}

export default SubNode;