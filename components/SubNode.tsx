import React from 'react';
import { findChildren, sortChildren, Tree } from '../src/tree';

interface Props {
  tree: Tree;
  id: string;
  onAddChild: (id: string, prevSibling: string | null) => void;
  onAddSiblingBefore: (id: string) => void;
}

const SubNode: React.FC<Props> = ({ 
  tree, 
  id, 
  onAddChild,
  onAddSiblingBefore,
}) => {
  const children = findChildren(tree, id);
  const sortedChildren = sortChildren(tree, children);

  return (
    <li>
      <span>{tree[id].id}</span>
      <button onClick={() => onAddSiblingBefore(id)}>Add sibling before</button>
      <button onClick={() => onAddChild(id, null)}>Add child</button>

      <ul>
        {sortedChildren?.map((child, index) => (
          <SubNode 
            key={child} 
            tree={tree} 
            id={child} 
            onAddChild={(id) => onAddChild(id, sortChildren[index - 1])}
            onAddSiblingBefore={(id) => onAddSiblingBefore(id)}
          />
        ))}
      </ul>
    </li>
  )
}

export default SubNode;