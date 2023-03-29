import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const enteredMail = useRef();
    const enteredPassword = useRef();
    const enteredConfirmPassword = useRef();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (enteredMail.current.value.length > 0 && enteredPassword.current.value.length > 0 && enteredConfirmPassword.current.value.length > 0) {
            if (enteredPassword.current.value !== enteredConfirmPassword.current.value) {
                alert("password and confirmPassword not matching")
            } else {
                try {
                    let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9KeN5MkE68bdM6gK61GjM9DumsLg5tpU", {
                        method: "POST",
                        body: JSON.stringify({
                            "email": enteredMail.current.value,
                            "password": enteredPassword.current.value,
                            "returnSecureToken": true
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if (response.ok) {
                        console.log("User has successfully signed up")
                        alert(`User has successfully signed up`)
                    } else {
                        alert("Authentication failed")
                        throw new Error("Sign up failed");
                    }  
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("please fill all the data")
        }
    }
    return (
        <div className='container w-25 my-3 border border-1 align-top bg-light rounded'>
            <Form className='my-auto'>
                <h4 className='text-center py-4'>Sign Up</h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" ref={enteredMail} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" ref={enteredPassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Control type="password" placeholder="Confirm Password" ref={enteredConfirmPassword} />
                </Form.Group>
                <Button variant="primary" className='w-100' type="submit" onClick={handleLogin}>
                    Sign Up
                </Button>
                <Button variant="outline-success" className='my-2 w-100'>
                    Have an account?Login
                </Button>
            </Form>
        </div>
    )
}

export default Login
