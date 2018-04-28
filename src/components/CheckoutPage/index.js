import React, { Component } from 'react';

import './styles.sass';

class CheckoutPage extends Component {



	render() {
		return (
			<div>
				<h1>Checkout</h1>
				<div className="checkoutSection">
					<h3>Personal</h3>
					<div className="inputWrapper">
            <input id="checkoutName" name="name" type="text" className="checkoutName" placeholder="Full Name" required />
          </div>
          <div className="inputWrapper">
            <input id="checkoutPhone" name="phone" type="text" className="checkoutPhone" placeholder="Phone Number" required />
          </div>
          <div className="inputWrapper">
            <input id="checkoutEmail" name="email" type="email" className="checkoutEmail" placeholder="Email" required />
          </div>
        </div>
				<div className="checkoutSection">
					<h3>Shipping</h3>
          <div className="inputWrapper">
            <input id="checkoutAddress" name="address" type="text" className="checkoutAddress" placeholder="Address Line 1" required />
          </div>
				</div>
				<div>
					<h3>Billing</h3>
					<div className="inputWrapper">
            <input
            	id="checkoutCreditCardNumber"
            	name="creditCardNumber"
            	type="text"
            	className="checkoutCreditCardNumber"
            	placeholder="Credit Card Number"
            	required />
          </div>
          <div className="inputWrapper">
            <input
            	id="checkoutCreditCardExpiration"
            	name="creditCardExpiration"
            	type="text"
            	className="checkoutCreditCardExpiration"
            	placeholder="Expiration MM/YYYY"
            	required />
          </div>
          <div className="inputWrapper">
            <input
            	id="checkoutCreditCardCVV"
            	name="creditCardCVV"
            	type="text"
            	className="checkoutCreditCardCVV"
            	placeholder="CVV"
            	required />
          </div>
          <div className="inputWrapper">
            <input
            	id="checkoutCreditCardName"
            	name="creditCardName"
            	type="text"
            	className="checkoutCreditCardName"
            	placeholder="Credit Card Name"
            	required />
          </div>
				</div>
				<button>Complete Secure Checkout</button>
			</div>
		);
	}
}

export default CheckoutPage;