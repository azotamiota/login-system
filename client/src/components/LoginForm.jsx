import React from 'react'

import FormHeader from './FormHeader'

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
   }
   
   render(){
    
    return( <>
     <FormHeader title='Login'/>
      <form onSubmit={(e) =>  this.props.handleLogin(e)}>
        <div className='row'>
          <label>Email</label>
          <input required id="log-email" type="text" name='email' placeholder="Enter your email" value={this.props.state.logEmail} onChange={(e) => {this.props.handleLogChange(e.target.value, 'email')}} />
        </div>
        <div className='row'>
          <label>Password</label>
          <input required id="log-password" type="password" name='password' placeholder="Enter your password" value={this.props.state.logPassword} onChange={(e) => {this.props.handleLogChange(e.target.value, 'password')}} />
        </div>
        <input className='submit-button' type='submit'></input>
      </form>
     </>
    )
  }
}

export default LoginForm
