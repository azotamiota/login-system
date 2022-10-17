import React from 'react'

import FormHeader from './FormHeader'

class RegisterForm extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    
    return( <>
      <FormHeader title='Register'/>
     <form onSubmit={(e) => this.props.handleRegister(e)}>
      <div className='row'>
        <label>Email</label>
        <input required id="reg-email" type="text" name='email' placeholder="Enter your email" value={this.props.state.regEmail} onChange={(e) => {this.props.handleRegChange(e.target.value, 'email')}} />
      </div>
      <div className='row'>
        <label>Password</label>
        <input required id="reg-password" type="password" name='password' placeholder="Enter your password" value={this.props.state.regPassword} onChange={(e) => {this.props.handleRegChange(e.target.value, 'password')}} />
      </div>
      <input className='submit-button' type='submit'></input>
    </form>
     </>
    )
  }
}

export default RegisterForm
