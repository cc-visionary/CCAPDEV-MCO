/* 
  This component contains the view of the BoxButton.
  Used in the Landing Page.
  used in the Navigation Component.
*/

import React from 'react';
import { Link } from 'react-router-dom';

const BoxButton = ({onClick, link, path, children}) => {
  return (
    link ? 
      <Link id="box-button" to={path}><span>{children}</span></Link>:
      <a id="box-button" onClick={onClick}><span>{children}</span></a>
  )
}

export default BoxButton;