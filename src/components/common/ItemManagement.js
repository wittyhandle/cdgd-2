import React, { useEffect, useReducer, useCallback } from "react";
import * as PropTypes from "prop-types";
import { Card } from "../index";
import itemReducer from "../reducers/itemReducer";
import { Modal } from "./index";

const ItemManagement = ({
  title,
  deleteTitle,
  children,
  emptyItem,
  getItemsFunc,
  deleteItemFunc,
  deletePane
}) => {
  const initialState = {
    items: [],
    total: 0,
    toDelete: [],
    toEdit: emptyItem
  };

  const [state, dispatch] = useReducer(itemReducer(), initialState);

  const queryItems = useCallback(
    (...args) =>
      getItemsFunc(...args).then(r => {
        dispatch({ type: "load_items", items: r.items, total: r.count });
      }),
    [getItemsFunc]
  );

  const doItemDelete = () => {
    deleteItemFunc(state.toDelete).then(() => {
      const items = state.items.filter(u => !state.toDelete.includes(u));
      dispatch({
        type: "delete_item",
        items,
        total: state.total - state.toDelete.length
      });
    });
  };

  useEffect(() => {
    queryItems(10, 0, "id", "asc").then(() => {
      /**/
    });
  }, [queryItems]);

  const createItemCallback = item => {
    dispatch({
      type: "new_item",
      items: [{ ...item, flair: "new" }, ...state.items],
      total: state.total + 1
    });
  };

  const updateItem = item => {
    const items = state.items.map(i => {
      if (i.id !== item.id) {
        return i;
      }
      return {
        ...i,
        flair: "edit",
        ...item
      };
    });

    dispatch({ type: "update_item", items, toEdit: emptyItem });
  };

  const loadItemForDelete = ids => {
    const toDelete = state.items.filter(item => ids.includes(item.id));
    dispatch({ type: "delete_prompt", toDelete });
  };

  const loadItemForEdit = id => {
    const toEdit = state.items.find(u => u.id === id);
    dispatch({ type: "load_edit_item", toEdit });
  };

  const cancelEdit = () => {
    dispatch({ type: "cancel_edit_item", toEdit: emptyItem });
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <Card title={title}>
          {() => (
            <>
              {children({
                createItemCallback,
                items: state.items,
                total: state.total,
                itemToEdit: state.toEdit,
                queryItems,
                loadItemForDelete,
                loadItemForEdit,
                cancelEdit,
                updateItem
              })}
            </>
          )}
        </Card>
      </div>
      <Modal
        show={state.toDelete.length > 0}
        title={deleteTitle}
        handleAction={doItemDelete}
        handleClose={() => {
          dispatch({ type: "cancel_delete_item" });
        }}
        submitLabel="Delete"
      >
        <div className="delete-prompt">{deletePane(state.toDelete)}</div>
      </Modal>
    </div>
  );
};

ItemManagement.propTypes = {
  title: PropTypes.string.isRequired,
  deleteTitle: PropTypes.string.isRequired,
  emptyItem: PropTypes.objectOf(PropTypes.any).isRequired,
  getItemsFunc: PropTypes.func.isRequired,
  deleteItemFunc: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  deletePane: PropTypes.func.isRequired
};

export default ItemManagement;
