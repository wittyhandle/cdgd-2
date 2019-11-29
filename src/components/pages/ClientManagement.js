import React, { useEffect, useReducer } from "react";
import { Card } from "../index";
import { ClientList } from "../client";

const ClientManagement = () => {
  const initialState = {
    clients: [],
    total: 0
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "load_clients": {
        return {
          ...state,
          clients: action.clients,
          total: action.total
        };
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line no-unused-vars
  const queryClients = (...args) => {
    const clients = [
      {
        id: 1,
        firstName: "Sally",
        lastName: "Martin",
        phone: "925-330-9002",
        email: "sally@gmail.com",
        addresses: [
          {
            street: "123 Main St",
            city: "Lafayette",
            state: "California",
            zip: "94549"
          }
        ]
      }
    ];

    dispatch({ type: "load_clients", clients, total: clients.length });
  };

  useEffect(() => {
    queryClients(10, 0, "id", "asc");
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <Card title="Client Management">
          {() => (
            <>
              <ClientList
                clients={state.clients}
                total={state.total}
                queryClients={queryClients}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ClientManagement;
