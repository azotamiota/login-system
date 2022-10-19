import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { alertMessage, setEmail, setPassword, submitReg } from '../actions';

const handleRegister = (event) => {
    event.preventDefault()
    console.log('handleRegister got executed')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useSelector(state => state.email)
    const password = useSelector(state => state.password)

    fetch(`http://localhost:3000/register`, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
    }).then((response) => response.json())
      .then((json) => {
          dispatch(alertMessage(json))
          console.log(json)
          // this.props.history.push("/thank-you");
    }).then(() => {
        dispatch(submitReg(true))    
    })
    .catch((error) =>  console.log(error.message))
    .finally(() => {
        dispatch(submitReg(true))
        dispatch(setEmail(''))
        dispatch(setPassword(''))
        setTimeout(() => dispatch(submitReg(false)), 5000) 
        // navigate('/login')
    })
  }


// export default HandleRegister
