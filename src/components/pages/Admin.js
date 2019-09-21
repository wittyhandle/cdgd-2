import React, { useState, useEffect } from 'react';
import { AuthenticationConsumer } from '../../context/authentication.context';
import { worksService } from '../../services';
import { WithSidebar} from "..";

const Admin = () => {

    const [works, setWorks] = useState([]);

    useEffect(() => {
        worksService.getWorks().then(works => {
            console.log(works);
        });
    });

    return (

        <AuthenticationConsumer>
            {({ currentUser }) => (
                <WithSidebar/>
            )}
        </AuthenticationConsumer>

    )
};

export default Admin;