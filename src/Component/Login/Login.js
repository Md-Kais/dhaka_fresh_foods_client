import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import './Login.css'

import { useHistory, useLocation } from 'react-router';
import { Badge, Button, CircularProgress } from '@material-ui/core';
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const googleLogoUrl = "https://clipground.com/images/google-logo-clipart-transparent.png";
const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photoUrl: '',
    })
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    let { from } = location.state || { from: { pathname: "/" } };
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordProvide, setPasswordProvide] = useState('');
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    var provider = new firebase.auth.GoogleAuthProvider();
    function handleSignIn() {
        firebase.auth().signInWithPopup(provider).then(res => {
            const credential = res.credential;

            const user = res.user;
            const { email, photoURL, displayName } = user;
            console.log(email);
            const newUser = {
                isSignedIn: true,
                name: displayName,
                photoURL:photoURL,
                email: email,
                error: '',
                success: true,

            }
            setUser(newUser);
            setLoggedInUser(newUser);
            setLoading(true);
            storeAuthToken();
            history.replace(from);
        })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = '';
                const newUserInfo = { ...user };
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                newUserInfo.name = '';
                newUserInfo.photoUrl='';
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                setLoading(true);
                console.log(errorCode, errorMessage, email);
            })
    }
    function handleSignOut() {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                password: '',
                photoUrl: '',
                error: '',
                success: false
            }
            setUser(signOutUser);

            setLoggedInUser(signOutUser)

        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const newUserInfo = { ...user };
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                newUserInfo.name = '';
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);

                console.log(errorCode, errorMessage, email);
            });

    }

    function handleBlur(event) {
        setLoading(true);
        const newUserInfo = { ...user };
        newUserInfo.error = '';
        newUserInfo.success = false;
        newUserInfo.name = '';
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        //console.log(event.target.name, event.target.value);
        let isFormValid = true;
        if (event.target.name === 'name') {
            if (event.target.value.length >= 3) {
                isFormValid = true;
            }

        }
        if (event.target.name === 'email') {
            const isValidEmail = (/^[^\s@]+@[^\s@]+$/).test(event.target.value);
            //console.log(isValidEmail);
            isFormValid = isValidEmail;
            function check() {
                if (isFormValid === false) {
                    alert('Please Provide valid Email')

                }
            }

            setTimeout(check(), 1000);
        }
        else if (event.target.name === 'password') {
            const isValidPass = event.target.value.length > 4;
            const passHasNumber = /\d{1}/.test(event.target.value);

            //console.log(isValidPass && passHasNumber);
            isFormValid = isValidPass && passHasNumber;
            function checkPass() {
                if (isValidPass === false) {
                    alert('Please provide more than 7 charecter and 1 number')

                }
                else {
                    setPasswordProvide(event.target.value);
                }
            }

            setTimeout(checkPass(), 200);
            // if (isValidPass === false) {
            //     alert('Please provide more than 7 charecter and 1 number')
            // }
            // else {

            // }


        }
        else if (event.target.name === 'checkPassword') {
            const isValidPass = event.target.value.length > 4;
            const passHasNumber = /\d{1}/.test(event.target.value);

            // console.log(isValidPass && passHasNumber);
            isFormValid = isValidPass && passHasNumber;

            setPasswordConfirm(event.target.value);
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    function handleSubmit(event) {
        setLoading(false);
        if (!user.name || !user.password) {
            alert('Check your email and Password. It\'s invalid')
        }
        if (newUser && user.name && user.email && user.password) {
            if (passwordConfirm === passwordProvide) {

                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then((userCredential) => {
                        const newUserInfo = { ...user };
                        newUserInfo.error = '';
                        newUserInfo.name = user.name;
                        newUserInfo.email=user.email;
                        newUserInfo.isSignedIn = true;
                        newUserInfo.success = true;
                        setUser(newUserInfo);
                        setLoggedInUser(newUserInfo);
                        setLoading(true);
                        history.replace(from);
                    }).catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        const newUserInfo = { ...user };
                        newUserInfo.error = errorMessage;
                        newUserInfo.success = false;
                        newUserInfo.name = '';
                        setUser(newUserInfo);
                        setLoading(true);
                        setLoggedInUser(newUserInfo);

                        //console.log(errorCode, errorMessage);
                    });

            }
            else {
                const newUserInfo = { ...user };
                newUserInfo.error = 'password Didnot match';
                newUserInfo.success = false;
                newUserInfo.name = '';
                setUser(newUserInfo);
                alert('Password Didnot match')
            }
        }

        if (!newUser && user.email && user.password) {
            //console.log(user.email, user.password); console.log('mewara');
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)

                .then((userCredential) => {

                    var user = userCredential.user;
                    console.log(user);
                    const newUserInfo = { ...user };
                    newUserInfo.isSignedIn = true;
                    newUserInfo.email=user.email;
                    newUserInfo.error = '';
                    newUserInfo.name = user.displayName;
                    if (newUserInfo.name === null) {
                        newUserInfo.name = "No Name";
                    }
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    setLoading(true);
                    storeAuthToken();
                    history.replace(from);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newUserInfo = { ...user };
                    newUserInfo.error = errorMessage;
                    newUserInfo.success = false;
                    newUserInfo.name = '';
                    setUser(newUserInfo);
                    
                    setLoggedInUser(newUserInfo);
                    setLoading(true)
                    console.log(errorCode, errorMessage);
                });
        }
        event.preventDefault();
    }


    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error

            });
    }


    return (
        <div className='pageDisplay'>
            <h3>User : {loggedInUser.name}</h3>
            {
                loggedInUser.isSignedIn && <p>You are logged in</p>
            }
            
            {
                loggedInUser.isSignedIn && <Button color="secondary" onClick={() => setLoggedInUser({})}>Sign Out</Button>
            }

            {newUser ? <strong>Create New Account</strong> : <p><strong>Login</strong></p>}
            <br />
            {newUser && <input type="text" name="name" placeholder="Name" onBlur={handleBlur} required></input>}

            <form required>

                <input type="text" name="email" placeholder="Email" onBlur={handleBlur} required></input>
                <br />
                <input type="password" name="password" placeholder="PassWord" onBlur={handleBlur} required></input>
                <br />
                {
                    newUser && <input type="password" name="checkPassword" placeholder="Confirm Password" onBlur={handleBlur} required></input>
                }
                <br />
                <input type="submit" onClick={handleSubmit}></input>
                <br />
                {
                    !loading ? <CircularProgress /> : loggedInUser.success ? <Badge variant="success" className="text-wrap">{newUser ? 'User Created' : 'Logged in'} Succesfully</Badge> : <Badge color="secondary" className="text-wrap">{loggedInUser.error}</Badge>
                }
            </form>
            {
                newUser
                    ?
                    <label htmlFor='newUser'>Already have account?<input type="button" onClick={() => setNewUser(!newUser)} name="newUser" value="Login" ></input> </label>
                    :
                    <label htmlFor='newUser'>Don't have account?<input type="button" onClick={() => setNewUser(!newUser)} name="newUser" value="Create one" ></input></label>
            }
            <hr />
            <p style={{ textAlign: 'center', color: 'red', fontSize: '24px', fontWeight: '600px' }}>Or</p>
            {
                loggedInUser.isSignedIn ? <button onClick={handleSignOut}>{loggedInUser.name}</button> : <button onClick={handleSignIn}><div style={{ display: 'flex' }}> <img src={googleLogoUrl} alt="google Logo" width='40px' /> <h4 style={{margin:'5px auto'}}>Continue with Google</h4></div></button>
            }

        </div>
    );
};

export default Login;