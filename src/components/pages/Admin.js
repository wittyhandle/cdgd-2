import React, { useState, useEffect } from 'react';
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
        <WithSidebar/>
    )
};

export default Admin;