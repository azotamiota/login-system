import React from "react";
import FormHeader from "../components/FormHeader";
import Form from '../components/Form'

class LoginForm extends React.Component{
  
  render(){
    return(
      <div className="form-container">
        <FormHeader title="Login" />
        <Form type='login'/>
      </div>
    )
  }
}

export default LoginForm;
