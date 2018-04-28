import React, { Component } from 'react';
import './styles.sass';

class LandingPage extends Component {
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }
  render() {
    return (
    	<div>
    		<h3 className="error text-center">Landing Page Content</h3>
      </div>
    );
  }
}

export default LandingPage;
