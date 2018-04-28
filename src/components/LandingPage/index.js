import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.sass';

class LandingPage extends Component {

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    return (
    	<div>
        <h2>Augmented Reality made simple for eCommerce</h2>
        <h5></h5>
        <div></div>
        <h3 className="error text-center">Landing Page</h3>
      </div>
    );
  }

}

export default LandingPage;
