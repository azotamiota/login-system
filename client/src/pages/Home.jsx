import React from 'react'
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import FormHeader from '../components/FormHeader'

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      regEmail: '',
      logEmail: '',
      regPassword: '',
      logPassword: '',
      isValidEmail: null,
      isValidPassword: null,
      isLoggedIn: false,
      submitted: false,
      alertMessage: {}
    };
    this.handleRegChange = this.handleRegChange.bind(this)
    this.handleLogChange = this.handleLogChange.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    
  }
  
  handleRegChange = (input, group) => {
    if (group === 'email') {
      if (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(input)) {
        this.setState({isValidEmail: true})
      } else {
        this.setState({isValidEmail: false})
        this.setState({isValidPassword: false})
      }
      this.setState({regEmail : input})
    } else {
      if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(input)) {
        this.setState({isValidPassword: true})
      } else {
        this.setState({isValidPassword: false})
      }
      this.setState({regPassword : input})
    }
  }

  handleLogChange = (input, group) => {
    if (group === 'email') {
      this.setState({logEmail : input})
    } else {
      this.setState({logPassword : input})
    }
  }

  handleRegister = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/register`, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: this.state.regEmail, password: this.state.regPassword})
    }).then((response) => response.json())
      .then((json) => {
          this.setState({alertMessage: json})
          this.setState({logEmail: json['email']})
          return this.props.setJustRegistered()
    })
    .catch((error) =>  console.log(error.message))
    .finally(() => {
      this.setState({submitted: true})
      this.setState({regEmail: ''});
      this.setState({regPassword: ''});
      setTimeout(() => {this.setState({submitted: false})}, 5000) 
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/login`, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: this.state.logEmail, password: this.state.logPassword})
    }).then((response) => response.json())
      .then((json) => {
        this.setState({alertMessage: json})
        if (json['success']) {
          localStorage.setItem('token', json['token'])
          this.setState({isLoggedIn: true})
          this.setState({logEmail: json['email']})
          return this.props.setIsLoggedIn()
        } else {
          throw "Unable to authenticate!"
        }
    })
    .catch((error) =>  console.log(error))
    .finally(() => {
      this.setState({logPassword: ''});
      this.setState({submitted: true})
      setTimeout(() => {this.setState({submitted: false})}, 4000)
      return this.props.setJustRegistered()
    })
  }
  
  handleLogout = () => {
    localStorage.clear()
    this.setState({submitted: false})
    this.setState({isLoggedIn: false})
    this.setState({logEmail: ''})
    return this.props.setIsLoggedIn()
  }

  render() {

    return ( <>
    {!this.state.isLoggedIn ? <>
    <div className='main-container'>
      <div className="form-container">
        <LoginForm state={this.state} handleLogChange={this.handleLogChange} handleLogin={this.handleLogin} value={this.state.regEmail}/>
      </div>
      <div className="form-container">
        <RegisterForm state={this.state} handleRegChange={this.handleRegChange} handleRegister={this.handleRegister}/>
      </div>
    </div>
    <div id='alert-container'>
      {(this.state.isValidEmail === false || this.state.isValidPassword === false) ? 
        <div className="alert alert-danger validation" role='alert'>
         Invalid email or password.<strong><br/>Password must contain</strong>
            <ul>
              <li>At least one upper case letter</li>
              <li>At least one lower case letter</li>
              <li>At least one digit</li>
              <li>At least one special character</li>
              <li>Minimum eight characters</li>
            </ul>
          </div> : this.state.submitted && 
            <div className={`alert alert-${this.state.alertMessage['success'] ? 'success' : 'danger'} validation`}>{this.state.alertMessage['message']}</div>
      }
     </div></> : 
      <div className="form-container">
        <FormHeader title={`Welcome, ${this.state.logEmail}!`} />
        <button className='submit-button' type='submit' onClick={this.handleLogout}><div style={{position: 'relative', top: '-8px'}}>Logout</div></button>
      </div>
    } 
      </>
    )
  }
}

const mapStateToProps = (state) => ({
    mystate: state
})

const mapDispatchToProps = (dispatch) => {
    return {
      setJustRegistered: () => dispatch({type: 'JUST_REGISTERED'}),
      setIsLoggedIn: () => dispatch({type: 'LOGGED_IN'}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
