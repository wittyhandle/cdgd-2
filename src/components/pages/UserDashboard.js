import React from "react";
import ItemManagement from "../common/ItemManagement";
import { CreateUser, UpdateUser, ListUser } from "../user";
import { userService } from "../../services";

const UserDashboard = () => {
  const getUsers = (...args) => userService.getUsers(...args);
  const deleteUsers = toDelete => userService.deleteUsers(toDelete);

  return (
    <ItemManagement
      getItemsFunc={getUsers}
      deleteItemFunc={deleteUsers}
      title="Users"
      deleteTitle="Delete User?"
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
        createItemCallback,
        loadItemForEdit,
        loadItemForDelete,
        items,
        total,
        itemToEdit,
        cancelEdit,
        queryItems,
        updateItem
      }) => (
        <>
          <CreateUser createUserCallback={createItemCallback} />
          {itemToEdit && (
            <UpdateUser
              userToEdit={itemToEdit}
              closeHandler={cancelEdit}
              updateUserHandler={updateItem}
            />
          )}
          <ListUser
            users={items}
            total={total}
            loadItemForEdit={loadItemForEdit}
            queryUsers={queryItems}
            loadItemForDelete={loadItemForDelete}
          />
        </>
      )}
    </ItemManagement>
  );
};

export default UserDashboard;
