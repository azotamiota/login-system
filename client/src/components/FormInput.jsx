import React from 'react'

class FormInput extends React.Component{
  render(){
    return(
      <div className="row">
        <label>{this.props.description}</label>
        <input type={this.props.type} placeholder={this.props.placeholder}/>
      </div> 
    )
  }
}

export default FormInput
