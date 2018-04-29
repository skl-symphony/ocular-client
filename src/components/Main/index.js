import React, { Component } from 'react';
import './styles.sass';
import Item from '../Item/index';

class Homepage extends Component {
  
  componentDidMount() {
    document.body.scrollTop = 0;
    document.querySelector('.menu').classList.remove('open');
  }

  render() {
    const items = [
      {
        id: "demo",
        name: "Demo Glasses",
        cost: "$40.00",
        description: "These glasses will absorb the disappointment on your parents' faces so you never have to acknowledge your inferiority complex."
      },
      {
        id: "kanye",
        name: "Kanye Shades",
        cost: "$340.00",
        description: "These glasses will allow the most nihilistic parts of your soul to manifest on Twitter."
      },
      {
        id: "circular",
        name: "Circle Glasses",
        cost: "$120.00",
        description: "For all your worst tech movie needs."
      },
      {
        id: "thin",
        name: "Wire Frame Glasses",
        cost: "$10.00",
        description: "These glasses will reflect the disappointment on your parents' faces right back at them."
      },
      {
        id: "lipstick",
        name: "Kylie's LipKit",
        cost: "$150.00",
        description: "Unable to lie? Then use this lipstick to distract from the constant tics."
      },
      {
        id: "baseball-cap",
        name: "Supreme Cap",
        cost: "$200.00",
        description: "Have unlimited money and enjoy participating in counter-culture? Then this Supreme cap is for you for all your casual flexing needs.",
        image: "https://stockx.imgix.net/products/streetwear/Supreme-New-Era-Mesh-Box-Logo-Cap-Black.jpg?fit=fill&bg=FFFFFF&w=1400&h=1000&auto=format,compress&trim=color&q=40"
      }
    ];

    return (
      <main className="main">
        {items.map((e, i) => <Item key={i} item={e} />)}
      </main>
    );
  }
}

export default Homepage;
