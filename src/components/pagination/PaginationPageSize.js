import React from "react";
import * as PropTypes from "prop-types";

const PaginationPageSize = ({ onPageSizeChange }) => {
  return (
    <div className="row page-size">
      <div className="col-lg-1">
        <p className="text-muted">Page Size:</p>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          name="pageSize"
          className="form-control"
          onChange={onPageSizeChange}
        >
          <option name="10">10</option>
          <option name="25">25</option>
          <option name="50">50</option>
        </select>
      </div>
    </div>
  );
};

PaginationPageSize.propTypes = {
  onPageSizeChange: PropTypes.func.isRequired
};

export default PaginationPageSize;
