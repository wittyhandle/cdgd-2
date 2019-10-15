import React from 'react';
import {UserList} from '../user/UserList';
import {Card} from '../index';
import {NewUser} from '../user/NewUser';

export const UserManagement = () => {
    
    return (

        <div className={'row'}>
            <div className={'col-lg-12'}>

                <Card title={'User Management'}>
                    {() => (
                        <div>
                            <NewUser/>
                            <UserList/>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
};