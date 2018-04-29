import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.sass';

class LandingPage extends Component {

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    const curlReq = "curl -XPOST -H 'Content-Type:application/json' 'https://ocular.herokuapp.com/render' -d'{\"image\":`${base64_encoded_image}`, \"model\":`${model_id}`}'";
    return (
  	  <div>
        <h3 className="text-center error">Augmented Reality Made Simple for eCommerce</h3>
      </div>
    );
  }

}

export default LandingPage;
