import React from 'react';
import { AuthenticationConsumer } from '../context/authentication.context';

const Admin = () => {
    return (

        <AuthenticationConsumer>
            {({ currentUser }) => (
                <div className={'row w-100'}>Admin ({currentUser})</div>
            )}
        </AuthenticationConsumer>

    )
};

export default Admin;