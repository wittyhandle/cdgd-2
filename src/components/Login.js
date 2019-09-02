import React from 'react';

const Login = () => {
    return (
        <div className={'row align-self-center w-100'}>
            <div className={'col'}>
                <form className={'mx-auto w-50 p-3'}>
                    <div className={'form-group'}>

                        <div className={'cdgd-field'}>
                            <label htmlFor='username'>Username</label>
                            <input type='text' className={'form-control'} id='username'/>
                        </div>

                        <div className={'cdgd-field'}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className={'form-control'} id='password'/>
                        </div>

                        <div className={'cdgd-button'}>
                            <button type='submit' className={'btn btn-primary'}>Submit</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;