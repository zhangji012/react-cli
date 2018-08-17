import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  render() {
    return <div>
      首页 IndustrialAmount  IndustrialASum JCBCount
    </div>
  }
}

export default Home

