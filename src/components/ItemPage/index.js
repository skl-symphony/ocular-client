import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.sass';

import DemoModal from '../DemoModal/index';

class ItemPage extends Component {
  
  constructor(props) {
    super(props);
    const itemsMap = {
      "demo": {
        id: "demo",
        name: "Demo Glasses",
        cost: "$40.00",
        description: "These glasses will absorb the disappointment on your parents' faces so you never have to acknowledge your inferiority complex."
      },
      "kanye": {
        id: "kanye",
        name: "Kanye Shades",
        cost: "$340.00",
        description: "These glasses will allow the most nihilistic parts of your soul to manifest on Twitter."
      },
      "circular": {
        id: "circular",
        name: "Circle Glasses",
        cost: "$120.00",
        description: "For all your worst tech movie needs."
      },
      "thin": {
        id: "thin",
        name: "Wire Frame Glasses",
        cost: "$10.00",
        description: "These glasses will reflect the disappointment on your parents' faces right back at them."
      },
      "lipstick": {
        id: "lipstick",
        name: "Kylie's LipKit",
        cost: "$150.00",
        description: "Unable to lie? Then use this lipstick to distract from the constant tics."
      },
      "baseball-cap": {
        id: "baseball-cap",
        name: "Supreme Cap",
        cost: "$200.00",
        description: "Have unlimited money and enjoy participating in counter-culture? Then this Supreme cap is for you for all your casual flexing needs."
      },
      null: {
        name: "Eloquent Javascript",
        cost: "$40.00",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    };

    const pathParamId = this.props.location.pathname.split('/').splice(-1, 1)[0];
    const item = itemsMap[pathParamId] || itemsMap[null];
    this.state = {
      modalOpened: false,
      item,
    };
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  closeModal() {
    this.setState({ modalOpened: false });
    document.body.classList.remove('modal-opened');
    document.body.style.marginRight = 0;
  }

  getModal() {
    if (this.state.modalOpened) {
      return (
        <DemoModal
          key="modal"
          openClass="open"
          type={this.state.item.id}
          name={this.state.item.name}
          close={this.closeModal.bind(this)}
        />
      );
    } else {
      return;
    }
  }

  openModal() {
    const scrollBar = document.querySelector('.scrollbar-measure');
    const scrollBarWidth = scrollBar.offsetWidth - scrollBar.clientWidth;
    document.body.classList.add('modal-opened');
    document.body.style.marginRight = `${scrollBarWidth}px`;
    this.setState({ modalOpened: true });
  }

  render() {
    const { item } = this.state;

    return (
      <div className="itemPageWrapper">
        {this.getModal()}
        <div className="itemImgWrapper" />
        <div className="itemInfoWrapper">
          <Link className="backLink" to="/browse">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">{item.name}</h3>
          <p className="itemCost frm">{item.cost}</p>
          <p className="description">{item.description}</p>
          <button className="demoBtn reqTradeBtn normalBtn" onClick={() => this.openModal()}>AR Demo</button>
          <button className="reqTradeBtn normalBtn">Add to Cart</button>
        </div>
      </div>
    );
  }
}

ItemPage.propTypes = {
  location: PropTypes.object,
};

export default ItemPage;
