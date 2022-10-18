import React from 'react'
import { Navigate } from 'react-router-dom'

class FormButton extends React.Component{
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  changeRedirect = () => {
    this.setState({redirect: true})
  }

  render(){
    console.log('props: ', this.props.clickEvent)
    return( <>
      <div className="row button">
        <button onClick={this.changeRedirect}>{this.props.title}</button>
      </div>
      {this.state.redirect && <Navigate to={this.props.route} replace={true}/>}
      </>
    )
  }
}

export default FormButton
