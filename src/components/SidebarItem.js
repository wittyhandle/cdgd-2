import React from "react";
import * as PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const SidebarItemWrapped = ({ path, location, icon, name }) => {
  const activeClass = () => {
    const route = location.pathname;
    return route.endsWith(path) ? "active" : "";
  };

  return (
    <li className={activeClass()}>
      <a href={`/${path}`}>
        <i className={`nc-icon ${icon}`} />
        <p>{name}</p>
      </a>
    </li>
  );
};

SidebarItemWrapped.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired
};

const SidebarItem = withRouter(SidebarItemWrapped);
export default SidebarItem;
