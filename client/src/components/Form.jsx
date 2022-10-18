import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsValidEmail, setIsValidPassword, setEmail, setPassword, setAlertMessage, submitReg } from '../actions'

const Form = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isValidEmail = useSelector(state => state.isValidEmail)
  const isValidPassword = useSelector(state => state.isValidPassword)
  const email = useSelector(state => state.email)
  const password = useSelector(state => state.password)
  const isRegSubmitted = useSelector(state => state.regSubmitted)
  const alertMessage = useSelector(state => state.alertMessage)


  const handleChange = (input, group) => {
    if (group === 'email') {
      if (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(input)) {
        dispatch(setIsValidEmail(true))
      } else {
        dispatch(setIsValidEmail(false))
        dispatch(setIsValidPassword(false))
      }
      dispatch(setEmail(input))
    } else {
      if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(input)) {
        dispatch(setIsValidPassword(true))

      } else {
        dispatch(setIsValidPassword(false))
      }
      dispatch(setPassword(input))

    }
  }

  const handleRegister = (event) => {
      event.preventDefault()
      console.log('handleRegister got executed')

      fetch(`http://localhost:3000/register`, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
      }).then((response) => response.json())
        .then((json) => {
            dispatch(setAlertMessage(json))
            console.log(json)
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

  // handleLogin = (event) => {
  //   console.log('handleLogin executed')
  //   event.preventDefault()
  //   fetch(`http://localhost:3000/login`, {
  //   method: 'POST',
  //   headers:{
  //       'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({email: this.state.email, password: this.state.password})
  //   }).then((response) => response.json())
  //     .then((json) => {
  //         this.setState({alertMessage: json})
  //         if (json['success']) {
  //           localStorage.setItem('token', json['token'])
  //           console.log('this.props: ', this.props)
  //           this.props.setIsLoggedIn()
  //         } else {
  //           throw "Unable to authenticate!"
  //         }
  //         console.log(json)
  //         // this.props.history.push("/thank-you");
  //   })
  //   // .then(() => {
  //   //   if (group === 'register') {
  //   //     console.log('change to setisLogged in')
  //   //     return this.props.setIsLoggedIn()
  //   //   }
  //   // })
  //   .catch((error) =>  console.log(error.message));
  //   this.setState({submitted: true})
  //   this.setState({email: ''});
  //   this.setState({password: ''});
  //   setTimeout(() => {this.setState({submitted: false})}, 5000) 
  // }
    
    return( <>
     <form onSubmit={(e) => props.type === 'register' ? handleRegister(e) : <HandleLogin />}> 
      <div className='row'>
        <label>Email</label>
        <input required id="email" type="text" name='email' placeholder="Enter your email" value={email} onChange={(e) => {handleChange(e.target.value, 'email')}} />
      </div>
      <div className='row'>
        <label>Password</label>
        <input required id="password" type="password" name='password' placeholder="Enter your password" value={password} onChange={(e) => {handleChange(e.target.value, 'password')}} />
      </div>
      <input className='submit-button' type='submit'></input>
    </form>
    <div id='alert-container'>
      {props.type == 'register' && 
      (isValidEmail === false || isValidPassword === false) ? 
        <div className="alert alert-danger validation" role='alert'>
         Invalid email or password.<strong><br/>Password must contain</strong>
            <ul>
              <li>At least one upper case letter</li>
              <li>At least one lower case letter</li>
              <li>At least one digit</li>
              <li>At least one special character</li>
              <li>Minimum eight characters</li>
            </ul>
          </div> : isRegSubmitted && 
            <div className={`alert alert-${alertMessage['success'] ? 'success' : 'danger'} validation`}>{alertMessage['message']}</div>
            }
     </div>
     </>
    )

}

export default Form