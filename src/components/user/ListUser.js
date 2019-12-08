import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginatedList } from "../pagination";
import { Tr } from "../common";

const ListUser = ({
  users,
  total,
  queryUsers,
  loadUserForDelete,
  loadItemForEdit
}) => {
  const [toDelete, setToDelete] = useState([]);

  const handleDeleteSelect = (e, id) => {
    if (e.target.checked) {
      const newDeletes = [...toDelete];
      newDeletes.push(id);
      setToDelete(newDeletes);
    } else {
      const newDeletes = toDelete.filter(u => u !== id);
      setToDelete(newDeletes);
    }
  };

  const headers = [
    {
      key: "delete",
      markup: () => (
        <Button
          className="no-hover"
          variant="link"
          onClick={() => loadUserForDelete(toDelete)}
        >
          <i className="nc-icon nc-simple-remove" />
        </Button>
      ),
      sortable: false,
      css: "narrow text-center"
    },
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
        <td className="text-center">
          <input type="checkbox" onChange={e => handleDeleteSelect(e, id)} />
        </td>
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
              onClick={() => loadUserForDelete([id])}
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

ListUser.defaultProps = {
  users: [],
  total: 0
};

ListUser.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userName: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      flair: PropTypes.string
    })
  ),
  queryUsers: PropTypes.func.isRequired,
  loadUserForDelete: PropTypes.func.isRequired,
  loadItemForEdit: PropTypes.func.isRequired,
  total: PropTypes.number
};

export default ListUser;
