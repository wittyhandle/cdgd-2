import { ITEM_ACTIONS } from "./actions";

const itemReducer = () => {
  return (state, action) => {
    switch (action.type) {
      case ITEM_ACTIONS.LOAD_ITEMS:
      case ITEM_ACTIONS.NEW_ITEM: {
        return {
          ...state,
          items: action.items,
          total: action.total
        };
      }
      case ITEM_ACTIONS.UPDATE_ITEM: {
        return {
          ...state,
          items: action.items,
          toEdit: action.toEdit
        };
      }
      case ITEM_ACTIONS.DELETE_PROMPT: {
        return {
          ...state,
          toDelete: action.toDelete
        };
      }
      case ITEM_ACTIONS.DELETE_ITEM: {
        return {
          ...state,
          items: action.items,
          total: action.total,
          toDelete: []
        };
      }
      case ITEM_ACTIONS.CANCEL_DELETE_ITEM: {
        return {
          ...state,
          toDelete: []
        };
      }
      case ITEM_ACTIONS.CANCEL_EDIT_ITEM: {
        return {
          ...state,
          toEdit: action.toEdit
        };
      }
      case ITEM_ACTIONS.LOAD_EDIT_ITEM: {
        return {
          ...state,
          toEdit: action.toEdit
        };
      }
      default: {
        return state;
      }
    }
  };
};

export default itemReducer;
