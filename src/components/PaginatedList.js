import React, { useReducer } from "react";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationControls, PaginationPageSize } from "./index";

const PaginatedList = ({
  getItemsHandler,
  total,
  headers,
  rowRenderer,
  items
}) => {
  const initialState = {
    isLoaded: false,
    success: false,
    limit: 10,
    startIndex: 0,
    currentPage: 1,
    fromRecord: 0,
    toRecord: 0,
    sortBy: "id",
    sortDirection: "asc"
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "change_page": {
        return {
          ...state,
          success: action.success,
          currentPage: action.selectedPage,
          startIndex: action.startIndex,
          fromRecord: action.fromRecord,
          toRecord: action.toRecord
        };
      }
      case "change_page_size": {
        return {
          ...state,
          success: action.success,
          currentPage: action.selectedPage,
          startIndex: action.startIndex,
          limit: action.limit,
          fromRecord: action.fromRecord,
          toRecord: action.toRecord
        };
      }
      case "set_sort": {
        return {
          ...state,
          success: action.success,
          sortBy: action.sortBy,
          sortDirection: action.sortDirection
        };
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePageChange = selectedPage => {
    const startIndex = (selectedPage - 1) * state.limit;
    getItemsHandler(
      state.limit,
      startIndex,
      state.sortBy,
      state.sortDirection
    ).then(() => {
      dispatch({
        type: "change_page",
        selectedPage,
        startIndex,
        success: true
      });
    });
  };

  const handlePageSizeChange = e => {
    const limit = Number(e.target.value);
    getItemsHandler(limit, 0, state.sortBy, state.sortDirection).then(() => {
      dispatch({
        type: "change_page_size",
        selectedPage: 1,
        startIndex: 0,
        limit,
        success: true
      });
    });
  };

  const handleSort = (column, direction) => {
    getItemsHandler(state.limit, state.startIndex, column, direction).then(
      () => {
        dispatch({
          type: "set_sort",
          sortBy: column,
          sortDirection: direction,
          success: true
        });
      }
    );
  };

  const isSortIconActive = (column, direction) =>
    state.sortBy === column && state.sortDirection === direction
      ? " active"
      : "";

  const fromRecord =
    state.currentPage === 1 ? 1 : (state.currentPage - 1) * state.limit + 1;
  const toRecord = Math.min(state.currentPage * state.limit, total);

  const renderSortIcon = h => {
    if (h.sortable === false) {
      return null;
    }
    return (
      <div className="sorts">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => handleSort(h.key, "asc")}
          onClick={() => handleSort(h.key, "asc")}
          className={`up${isSortIconActive(h.key, "asc")}`}
        >
          <FontAwesomeIcon icon="sort-up" />
        </div>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => handleSort(h.key, "desc")}
          onClick={() => handleSort(h.key, "desc")}
          className={`down${isSortIconActive(h.key, "desc")}`}
        >
          <FontAwesomeIcon icon="sort-down" />
        </div>
      </div>
    );
  };

  return (
    <div className="cdgd-pagination bootstrap-table">
      <PaginationPageSize onPageSizeChange={handlePageSizeChange} />
      <div className="table-responsive fixed-table-container">
        <table className="table table-hover">
          <thead className="text-info">
            <tr>
              {headers.map(h => (
                <th key={h.key} className={h.css || ""}>
                  {h.name}
                  {renderSortIcon(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{items.map(item => rowRenderer(item))}</tbody>
        </table>
      </div>
      <PaginationControls
        total={total}
        pageSize={state.limit}
        currentPage={state.currentPage}
        fromRecord={fromRecord}
        toRecord={toRecord}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

PaginatedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  queryParams: PropTypes.shape({
    limit: PropTypes.string,
    startIndex: PropTypes.number,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.string
  }).isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      css: PropTypes.string
    })
  ).isRequired,
  getItemsHandler: PropTypes.func.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default PaginatedList;
