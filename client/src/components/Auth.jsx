import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'; 

import signInImage from '../assets/signup.jpeg';

// Create an object with initial state of the form (empty).
const initialState = {
    fullName : '',
    userName : '',
    password : '',
    avatarURL : '',
    confirmPassword : '',
    phoneNumber : '',
}

const cookies = new Cookies();

const Auth = () => {
    const [ isSignup, setIsSignUp ] = useState(true); // Maintain the state of user login. user is logged in or not. 
    const [ form, setForm ] = useState(initialState);

    const handleChange = (event) => {
        setForm({... form, [event.target.name] : event.target.value }); // wrap the key in square brackets (it is extracted from input tag's name
        // field) to update its value
       
    } // gets all the input from the form provided by the user.

    const handleSubmit = (event) => {
        event.preventDefault(); // to avaoid reach from reloading the page. we want to maintain the state until the form is submitted.

        const { fullName, userName, password, phoneNumber, avatarURL } = form; // get the data from the form.

        const URL = 'http://localhost:5000/auth'; // URL of the server port where the data is sent.

        // Make a request to the server using a different URL based on the case if the user is logged in or not; 
        // we send the data to the server and get back some data.
        const { data : { token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            userName, password, fullName, phoneNumber, avatarURL,
        });

        // save the data recieved from the server in the cookies
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }
        
        // After the cookies are set, reload the application! 
        window.location.reload(); // we reload the <App/> component
    }

    const switchMode = () => {
        // setIsSignUp(!isSignup) ----NOT BEST PRACTICE
        // Correct way to change the state depending on its previours state
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)  
    }
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    {/* Check if we are on the Signup form or not */}
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
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
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required // This is one of those * field!!!
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required // This is one of those * field!!!
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? 'Sign In' : 'Sign Up'}</button>
                        </div>
                    </form>

                    {/* To Switch between SignUp and SignIn page if user already has an account */}
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup ? "Already have an account?" : "Don't have an account?"}
                            <span onClick={switchMode}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signInImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth;