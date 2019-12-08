import React from "react";
import ItemManagement from "../common/ItemManagement";
import { EditUser, NewUser, UserList } from "../user";
import { userService } from "../../services";
import { EMPTY_EDIT_USER } from "../../utils/config";

const UserDashboard = () => {
  const getUsers = (...args) => userService.getUsers(...args);
  const deleteUsers = toDelete => userService.deleteUsers(toDelete);

  return (
    <ItemManagement
      getItemsFunc={getUsers}
      deleteItemFunc={deleteUsers}
      title="Users"
      deleteTitle="Delete User?"
      emptyItem={EMPTY_EDIT_USER}
      deletePane={toDelete => (
        <div>
          Are you sure you want to delete the following users?
          <ul>
            {toDelete.map(u => (
              <li key={u.id}>{u.userName}</li>
            ))}
          </ul>
        </div>
      )}
    >
      {({
        newItemHandler,
        loadItemForEdit,
        promptDeleteItemHandler,
        items,
        total,
        itemToEdit,
        cancelEdit,
        queryItems,
        updateItem
      }) => (
        <>
          <NewUser newUserHandler={newItemHandler} />
          <EditUser
            userToEdit={itemToEdit}
            closeHandler={cancelEdit}
            updateUserHandler={updateItem}
          />
          <UserList
            users={items}
            total={total}
            loadItemForEdit={loadItemForEdit}
            queryUsers={queryItems}
            promptDeleteHandler={promptDeleteItemHandler}
          />
        </>
      )}
    </ItemManagement>
  );
};

export default UserDashboard;
