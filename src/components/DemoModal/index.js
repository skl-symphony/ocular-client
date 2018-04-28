import React, { Component, PropTypes } from 'react';
import Webcam from 'react-webcam';

import './styles.sass';

class DemoModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.modalWrapper.classList.add(this.props.openClass);
    }, 50);
  }

  close() {
    this.modalWrapper.classList.remove(this.props.openClass);
    setTimeout(() => {
      this.props.close();
    }, 850);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imageSrc = this.webcam.getScreenshot();
  };

  render() {
    return (
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          <div className="heading">
            <h3>AR Demo</h3>
          </div>
          <div className="itemWrapper">
            <div className="itemPicWrapper">
              <Webcam
                audio={false}
                height={350}
                ref={(webcam) => this.setRef(webcam)}
                screenshotFormat="image/jpeg"
                width={350}
              />
              <button className="captureBtn" onClick={() => this.capture}>Capture photo</button>
            </div>
            <div className="itemInfoWrapper">
              <div className="inputWrapper">
                <canvas style={{ border: '1px solid black' }}></canvas>
              </div>
            </div>
          </div>
          <div className="buttonWrapper">
            <button className="cancelItemBtn" onClick={this.close.bind(this)}>Cancel</button>
            <button className="addToCartBtn" onClick={this.close.bind(this)}>Add To Cart</button>
          </div>
        </div>
      </div>
    );
  }
}

DemoModal.propTypes = {
  close: PropTypes.func,
  openClass: PropTypes.string
};

export default DemoModal;