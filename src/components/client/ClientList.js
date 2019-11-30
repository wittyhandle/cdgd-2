import React from "react";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { PaginatedList } from "../pagination";
import { Tr } from "../common";

const ClientList = ({ clients, total, queryClients }) => {
  const headers = [
    { key: "id", name: "Id", css: "narrow text-center" },
    { key: "firstName", name: "First Name" },
    { key: "lastName", name: "Last Name" },
    { key: "email", name: "Email" },
    { key: "actions", name: "Actions", sortable: false, css: "text-center" }
  ];

  // eslint-disable-next-line react/prop-types
  const rowRenderer = ({ id, firstName, lastName, email, flair }) => {
    return (
      <Tr key={id} flairCss={flair}>
        <td className="text-center">{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>
          <div className="text-center">
            <Button className="no-hover" variant="link">
              <i className="nc-icon nc-simple-remove" />
            </Button>
            <Button className="no-hover" variant="link">
              <FontAwesomeIcon icon="pencil-alt" />
            </Button>
          </div>
        </td>
      </Tr>
    );
  };

  return (
    <PaginatedList
      items={clients}
      total={total}
      headers={headers}
      getItemsHandler={queryClients}
      rowRenderer={rowRenderer}
    />
  );
};

ClientList.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      flair: PropTypes.string
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  queryClients: PropTypes.func.isRequired
};

export default ClientList;
