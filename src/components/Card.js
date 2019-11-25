import React from "react";
import * as PropTypes from "prop-types";

const Card = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-body">{children()}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Card;
