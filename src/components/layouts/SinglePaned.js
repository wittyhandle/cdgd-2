import React from "react";
import * as PropTypes from "prop-types";
import "./single-paned.scss";
import { Footer } from "../index";

const SinglePaned = ({ children }) => {
  return (
    <div className="single-paned">
      <div className="main-panel">
        <div className="content">
          <div className="row">
            <div className="col-md-4 mx-auto">{children()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

SinglePaned.propTypes = {
  children: PropTypes.func.isRequired
};

export default SinglePaned;
