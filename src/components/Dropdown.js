import React, { useState } from "react";
import * as PropTypes from "prop-types";

const Dropdown = ({ title, items }) => {
  const [dropdownState, setDropdownState] = useState({
    cssClass: "",
    isExpanded: false
  });

  const onDropDownToggle = () => {
    const klass = dropdownState.cssClass === "" ? "show" : "";
    setDropdownState({
      cssClass: klass,
      isExpanded: !dropdownState.isExpanded
    });
  };

  return (
    <li className={`nav-item btn-rotate dropdown ${dropdownState.cssClass}`}>
      <button
        className="nav-link dropdown-toggle btn-link"
        onClick={onDropDownToggle}
        data-toggle="dropdown"
        aria-expanded={dropdownState.isExpanded}
        type="button"
      >
        <i className="nc-icon" />
        <p>
          <span className="d-md-block">{title}</span>
        </p>
      </button>
      <div
        className={`dropdown-menu dropdown-menu-right ${dropdownState.cssClass}`}
      >
        {items.map(i => (
          <a key={i.path} className="dropdown-item" href={i.path}>
            {i.title}
          </a>
        ))}
      </div>
    </li>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired
};

export default Dropdown;
