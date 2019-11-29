import React, { useEffect, useReducer } from "react";
import { Card } from "../index";
import { EditUser, UserList, NewUser } from "../user";
import { Modal } from "../common";
import { userService } from "../../services";

const UserManagement = () => {
  const EMPTY_EDIT_USER = {
    id: 0,
    userName: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  const initialState = {
    users: [],
    total: 0,
    toDelete: [],
    toEdit: EMPTY_EDIT_USER
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "load_users":
      case "new_user": {
        return {
          ...state,
          users: action.users,
          total: action.total
        };
      }
      case "update_user": {
        return {
          ...state,
          users: action.users,
          toEdit: EMPTY_EDIT_USER
        };
      }
      case "delete_prompt": {
        return {
          ...state,
          toDelete: action.toDelete
        };
      }
      case "delete_user": {
        return {
          ...state,
          users: action.users,
          total: action.total,
          toDelete: []
        };
      }
      case "cancel_delete_user": {
        return {
          ...state,
          toDelete: []
        };
      }
      case "cancel_edit_user": {
        return {
          ...state,
          toEdit: EMPTY_EDIT_USER
        };
      }
      case "load_edit_user": {
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

  const [state, dispatch] = useReducer(reducer, initialState);

  const queryUsers = (...args) =>
    userService.getUsers(...args).then(r => {
      dispatch({ type: "load_users", users: r.items, total: r.count });
    });

  useEffect(() => {
    queryUsers(10, 0, "id", "asc");
  }, []);

  const newUserHandler = user => {
    dispatch({
      type: "new_user",
      users: [{ ...user, flair: "new" }, ...state.users],
      total: state.total + 1
    });
  };

  const updateUserHandler = user => {
    const users = state.users.map(u => {
      if (u.userName !== user.userName) {
        return u;
      }
      return {
        ...u,
        flair: "edit",
        ...user
      };
    });

    dispatch({ type: "update_user", users });
  };

  const promptDeleteHandler = ids => {
    const toDelete = state.users.filter(user => ids.includes(user.id));
    dispatch({ type: "delete_prompt", toDelete });
  };

  const doUserDelete = () => {
    userService.deleteUsers(state.toDelete).then(() => {
      const users = state.users.filter(u => !state.toDelete.includes(u));
      dispatch({
        type: "delete_user",
        users,
        total: state.total - state.toDelete.length
      });
    });
  };

  const doUserEdit = id => {
    const toEdit = state.users.find(u => u.id === id);
    dispatch({ type: "load_edit_user", toEdit });
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <Card title="User Management">
          {() => (
            <>
              <NewUser newUserHandler={newUserHandler} />
              <UserList
                users={state.users}
                total={state.total}
                queryUsers={queryUsers}
                promptDeleteHandler={promptDeleteHandler}
                editUserHandler={doUserEdit}
              />
            </>
          )}
        </Card>
      </div>

      <Modal
        show={state.toDelete.length > 0}
        title="Delete User?"
        handleAction={doUserDelete}
        handleClose={() => {
          dispatch({ type: "cancel_delete_user" });
        }}
        submitLabel="Delete"
      >
        <div className="delete-prompt">
          Are you sure you want to delete the following users?
          <ul>
            {state.toDelete.map(u => (
              <li key={u.id}>{u.userName}</li>
            ))}
          </ul>
        </div>
      </Modal>

      <EditUser
        userToEdit={state.toEdit}
        closeHandler={() => {
          dispatch({ type: "cancel_edit_user" });
        }}
        updateUserHandler={updateUserHandler}
      />
    </div>
  );
};

export default UserManagement;
