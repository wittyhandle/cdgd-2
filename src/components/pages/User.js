import React, { useState, useEffect } from 'react';

export const User = () => {

    useEffect(() => {
        // worksService.getWorks().then(works => {
        //     console.log(works);
        // });
        console.log('in User useEffect');
    });

    return (
        <div>I am in the user</div>
    )
};