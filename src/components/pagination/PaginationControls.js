/* eslint-disable react/no-array-index-key */
import React from "react";
import * as PropTypes from "prop-types";

const PaginationControls = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
  fromRecord,
  toRecord
}) => {
  const handlePageChange = page => {
    onPageChange(page);
  };

  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const showingLabel = total
    ? `Showing ${fromRecord} - ${toRecord} of ${total}`
    : "";
  const linkCount = Math.ceil(total / pageSize);

  return (
    <div>
      <hr />
      <div className="row justify-content-between">
        <div className="col-lg-8 pagination-label">
          <p className="text-muted">{showingLabel}</p>
        </div>
        <div className="col-lg-4">
          <ul className="pagination pull-right">
            <li
              className={`page-item${
                currentPage === 1 ? " text-muted disabled" : ""
              }`}
            >
              <button
                type="button"
                className={`page-link btn-link${
                  currentPage !== 1 ? " text-info" : ""
                }`}
                onClick={handlePreviousClick}
              >
                <i className="nc-icon nc-minimal-left" />
              </button>
            </li>

            {[...Array(linkCount)].map((n, i) => (
              <li
                key={i}
                className={`page-item${i === currentPage - 1 ? " active" : ""}`}
              >
                <button
                  type="button"
                  className={`page-link btn-link${
                    i !== currentPage - 1 ? " text-info" : ""
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item${
                currentPage === linkCount ? " text-muted disabled" : ""
              }`}
            >
              <button
                type="button"
                className={`page-link btn-link${
                  currentPage !== linkCount ? " text-info" : ""
                }`}
                onClick={handleNextClick}
              >
                <i className="nc-icon nc-minimal-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

PaginationControls.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  fromRecord: PropTypes.number.isRequired,
  toRecord: PropTypes.number.isRequired
};

export default PaginationControls;
