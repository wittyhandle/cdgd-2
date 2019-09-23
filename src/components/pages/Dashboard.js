import React, { useState, useEffect } from 'react';
import {worksService} from '../../services';
import { ThreePaned} from '..';

export const Dashboard = () => {

    const [works, setWorks] = useState([]);

    useEffect(() => {
        worksService.getWorks().then(works => {
            console.log(works);
        });
    });

    return (
        <ThreePaned/>
    )
};