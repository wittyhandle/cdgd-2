import React, { useState, useEffect } from 'react';
import { AuthenticationConsumer } from '../context/authentication.context';
import { worksService } from '../services/';

export const Admin = () => {

    const [works, setWorks] = useState([]);

    useEffect(() => {
        worksService.getWorks().then(works => {
            console.log(works);
        });
    });

    return (

        <AuthenticationConsumer>
            {({ currentUser }) => (
                <div className={'row w-100'}>Admin ({currentUser})</div>
            )}
        </AuthenticationConsumer>

    )
};