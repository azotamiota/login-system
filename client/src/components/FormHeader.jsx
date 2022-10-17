import React from 'react'

class FormHeader extends React.Component{
  render(){
    return(
      <h2 id="headerTitle">{this.props.title}</h2>
    )
  }
}

export default FormHeader
