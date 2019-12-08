const itemReducer = () => {
  return (state, action) => {
    switch (action.type) {
      case "load_items":
      case "new_item": {
        return {
          ...state,
          items: action.items,
          total: action.total
        };
      }
      case "update_item": {
        return {
          ...state,
          items: action.items,
          toEdit: action.toEdit
        };
      }
      case "delete_prompt": {
        return {
          ...state,
          toDelete: action.toDelete
        };
      }
      case "delete_item": {
        return {
          ...state,
          items: action.items,
          total: action.total,
          toDelete: []
        };
      }
      case "cancel_delete_item": {
        return {
          ...state,
          toDelete: []
        };
      }
      case "cancel_edit_item": {
        return {
          ...state,
          toEdit: action.toEdit
        };
      }
      case "load_edit_item": {
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
