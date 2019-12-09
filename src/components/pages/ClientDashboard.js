import React from "react";
import { clientService } from "../../services";
import ItemManagement from "../common/ItemManagement";
import { CreateClient, UpdateClient, ListClient } from "../client";

const ClientDashboard = () => {
  const getClients = (...args) => clientService.getClients(...args);
  const deleteClients = toDelete => clientService.deleteClients(toDelete);

  return (
    <ItemManagement
      getItemsFunc={getClients}
      deleteItemFunc={deleteClients}
      title="Clients"
      deleteTitle="Delete Client?"
      deletePane={toDelete => (
        <div>
          Are you sure you want to delete the following clients?
          <ul>
            {toDelete.map(c => (
              <li key={c.id}>
                {c.firstName} {c.lastName}
              </li>
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
          <CreateClient createClientCallback={createItemCallback} />
          {itemToEdit && (
            <UpdateClient
              clientToEdit={itemToEdit}
              closeHandler={cancelEdit}
              updateClientHandler={updateItem}
            />
          )}
          <ListClient
            clients={items}
            total={total}
            loadItemForEdit={loadItemForEdit}
            queryClients={queryItems}
            loadItemForDelete={loadItemForDelete}
          />
        </>
      )}
    </ItemManagement>
  );
};

export default ClientDashboard;
