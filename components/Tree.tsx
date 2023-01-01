import React, { useState } from 'react';
import { buildDefaultTree, findChildren } from '../src/tree';

const Tree: React.FC = () => {
  const [tree, setTree] = useState(buildDefaultTree());

  const children = findChildren(tree, 'root');

  console.log(children);

  return (
    <div>
      <p>Tree</p>
      <ul></ul>

      <hr />

      <button>Add child</button>
    </div>
  )
}

export default Tree;