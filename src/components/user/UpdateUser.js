import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as PropTypes from "prop-types";
import { userService } from "../../services";
import { Field, Submit } from "../forms";
import { Modal } from "../common";
import { createUserRules } from "../../utils/validations";

const UpdateUser = ({ updateUserHandler, userToEdit, closeHandler }) => {
  const updateUser = (user, reset, setSubmitting) => {
    const { userName } = user;
    userService
      .updateUser(userName, user)
      .then(() => {
        reset();
        updateUserHandler(user);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="row">
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{ ...userToEdit }}
        validationSchema={Yup.object().shape({ ...createUserRules })}
        onSubmit={(user, { setSubmitting, resetForm }) => {
          updateUser(user, resetForm, setSubmitting);
        }}
      >
        {({ isSubmitting, values }) => (
          <>
            <Modal
              show={!!userToEdit}
              title="Edit User"
              handleClose={() => closeHandler()}
              submitter={() => (
                <Submit isSubmitting={isSubmitting} title="Update" />
              )}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12 form-container">
                    <div className="row">
                      <Field
                        name="userName"
                        label="Username"
                        value={values.userName}
                        type="text"
                        colCss="col-lg-6"
                        disabled
                      />
                      <Field
                        name="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        colCss="col-lg-6"
                      />
                    </div>
                    <div className="row">
                      <Field
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        type="text"
                        colCss="col-lg-6"
                      />
                      <Field
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        type="text"
                        colCss="col-lg-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </>
        )}
      </Formik>
    </div>
  );
};

UpdateUser.defaultProps = {
  userToEdit: null
};

UpdateUser.propTypes = {
  updateUserHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  userToEdit: PropTypes.shape({ id: PropTypes.number })
};

export default UpdateUser;
