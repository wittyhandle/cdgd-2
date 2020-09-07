import React from "react";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { PaginatedList } from "../pagination";
import { Tr, useSelectionDelete } from "../common";

const ListClient = ({
  clients,
  total,
  queryClients,
  loadItemForDelete,
  loadItemForEdit
}) => {
  const [toDelete, handleDeleteSelect] = useSelectionDelete();

  const headers = [
    {
      key: "delete",
      markup: () => (
        <Button
          className="no-hover"
          variant="link"
          onClick={() => loadItemForDelete(toDelete)}
        >
          <i className="nc-icon nc-simple-remove" />
        </Button>
      ),
      sortable: false,
      css: "narrow text-center"
    },
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
        <td className="text-center">
          <input type="checkbox" onChange={e => handleDeleteSelect(e, id)} />
        </td>
        <td className="text-center">{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>
          <div className="text-center">
            <Button
              className="no-hover"
              variant="link"
              onClick={() => loadItemForDelete([id])}
            >
              <i className="nc-icon nc-simple-remove" />
            </Button>
            <Button
              className="no-hover"
              variant="link"
              onClick={() => loadItemForEdit(id)}
            >
              <FontAwesomeIcon icon="pencil-alt" />
            </Button>
            <Button
              className="no-hover"
              variant="link"
              href="#"
            >
              <FontAwesomeIcon icon="eye" />
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

ListClient.propTypes = {
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
  loadItemForDelete: PropTypes.func.isRequired,
  loadItemForEdit: PropTypes.func.isRequired,
  queryClients: PropTypes.func.isRequired
};

export default ListClient;
