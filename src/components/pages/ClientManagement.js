import React, { useEffect, useReducer } from "react";
import { Card } from "../index";
import { ClientList, CreateClient } from "../client";
import { clientService } from "../../services";

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

  const queryClients = (...args) => {
    clientService.getClients(...args).then(r => {
      dispatch({
        type: "load_clients",
        clients: r.items,
        total: r.count
      });
    });
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
              <CreateClient />
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
