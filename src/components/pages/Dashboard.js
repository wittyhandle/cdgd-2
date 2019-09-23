import React, { useState, useEffect } from 'react';
import {worksService} from '../../services';

export const Dashboard = () => {

    const [works, setWorks] = useState([]);

    useEffect(() => {
        worksService.getWorks().then(works => {
            console.log(works);
        });
    });

    return (
        <div>I am in the dashboard</div>
    )
};