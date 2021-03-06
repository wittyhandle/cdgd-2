import React from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="sidebar" data-color="white" data-active-color="info">
      <div className="logo">
        <a href="/" className="simple-text logo-normal">
          CDGD
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <SidebarItem path="admin" name="Dashboard" icon="nc-bank" />
          <SidebarItem path="client" name="Clients" icon="nc-atom" />
          <SidebarItem path="user" name="Users" icon="nc-badge" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
