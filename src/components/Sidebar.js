import React from 'react';

function Sidebar({ children, isOpen }) {
  const classnames = isOpen ? 'sidebar open' : 'sidebar';
  return <div className={classnames}>{children}</div>;
}

export default Sidebar;
