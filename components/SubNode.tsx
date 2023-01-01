import React from 'react';
import { findChildren, Tree } from '../src/tree';

interface Props {
  tree: Tree;
  id: string;
  onAddChild: (id: string) => void;
}

const SubNode: React.FC<Props> = ({ tree, id, onAddChild }) => {
  const children = findChildren(tree, id);

  return (
    <li>
      <span>{tree[id].value}</span>
      <button onClick={() => onAddChild(id)}>Add child</button>

      <ul>
        {children?.map((child) => (
          <SubNode key={child} tree={tree} id={child} onAddChild={() => onAddChild(child)}/>
        ))}
      </ul>
    </li>
  )
}

export default SubNode;