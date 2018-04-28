import React, { Component } from 'react';
// import {Link} from 'react-router';
import { browserHistory } from 'react-router';

import './styles.sass';

class Item extends Component {

	constructor(props) {
		super(props);
	}

  render() {
  	const { item } = this.props;

    return(
      <div className="item">
        <div className="content" onClick={() => browserHistory.push(`/item/${this.props.item.id}`)} />
        <div className="itemInfo">
	        <span className="itemName">{item.name}</span>
	        <span className="itemPrice">{item.cost}</span>
        </div>
      </div>
    );
  }
}

export default Item;
