import React from "react";
import FormHeader from "../components/FormHeader";
import Form from '../components/Form'

class RegisterForm extends React.Component{

  render(){
    return(
      <div className="form-container">
        <FormHeader title="Register" />
        <Form type='register'/>
      </div>
    )
  }
}

export default RegisterForm;
