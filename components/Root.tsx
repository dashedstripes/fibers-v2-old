import React, { useState } from 'react';
import { addChild, buildDefaultTree, createTreeNode, createTreeNodeId, findChildren, Tree } from '../src/tree';
import SubNode from './SubNode';

const Root: React.FC = () => {
  const [tree, setTree] = useState<Tree>(buildDefaultTree());

  const children = findChildren(tree, 'root');

  function handleAddChild(id: string) {
    const nid = createTreeNodeId();
    const n = createTreeNode(nid, 'child');
    const t = addChild({...tree}, n, id);
    setTree(t);
  }

  return (
    <div>
      <p>Tree</p>

      <ul>
        {children?.map((child) => (
          <SubNode key={child} tree={tree} id={child} onAddChild={(id) => handleAddChild(id)}/>
        ))}
      </ul>

      <hr />

      <button onClick={() => handleAddChild('root')}>Add child</button>
    </div>
  )
}

export default Root;