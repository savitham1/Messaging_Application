import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'; 

import signInImage from '../assets/signup.jpeg';

const Auth = () => {
    const [ isSignup, setIsSignUp ] = useState(true);

    const handleChange = () => {}
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    {/* Check if we are on the Signup form or not */}
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={() => {}}>
                        {/* if SignUp is true then execute the div */}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required // This is one of those * field!!!
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="userName">User Name</label>
                            <input
                                name="userName"
                                type="text"
                                placeholder="User Name"
                                onChange={handleChange}
                                required // This is one of those * field!!!
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required // This is one of those * field!!!
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required // This is one of those * field!!!
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;