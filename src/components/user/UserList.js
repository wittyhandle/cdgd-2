import React from "react";
import * as PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginatedList } from "../pagination";
import { Tr } from "../common";

export const UserList = ({
  users,
  total,
  queryUsers,
  promptDeleteHandler,
  editUserHandler
}) => {
  const headers = [
    { key: "id", name: "Id", css: "narrow text-center" },
    { key: "username", name: "Username" },
    { key: "firstName", name: "First Name" },
    { key: "lastName", name: "Last Name" },
    { key: "email", name: "Email" },
    { key: "actions", name: "Actions", sortable: false, css: "text-center" }
  ];

  // eslint-disable-next-line react/prop-types
  const rowRenderer = ({ id, userName, firstName, lastName, email, flair }) => {
    return (
      <Tr key={id} flairCss={flair}>
        <td className="text-center">{id}</td>
        <td>{userName}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>
          <div className="text-center">
            <Button
              className="no-hover"
              variant="link"
              onClick={() => promptDeleteHandler(id)}
            >
              <i className="nc-icon nc-simple-remove" />
            </Button>
            <Button
              className="no-hover"
              variant="link"
              onClick={() => editUserHandler(id)}
            >
              <FontAwesomeIcon icon="pencil-alt" />
            </Button>
          </div>
        </td>
      </Tr>
    );
  };

  return (
    <PaginatedList
      items={users}
      total={total}
      headers={headers}
      getItemsHandler={queryUsers}
      rowRenderer={rowRenderer}
    />
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      flair: PropTypes.string
    })
  ).isRequired,
  queryUsers: PropTypes.func.isRequired,
  promptDeleteHandler: PropTypes.func.isRequired,
  editUserHandler: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default UserList;
