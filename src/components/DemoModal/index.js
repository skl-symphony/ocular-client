import React, { Component, PropTypes } from 'react';
import Webcam from 'react-webcam';

import sunglasses from '../../assets/images/sunglasses.jpeg';

import './styles.sass';

const encodedSunglasses = "data:image/jpeg;base64,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";

class DemoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      snapshot: false
    };
    setInterval(function () {
      if (this.state.recording) {
        this.drawImagesOnCanvas();
      }
    }.bind(this), 500);
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

  setWebcamRef(webcam) {
    this.webcam = webcam;
  }

  setCanvasRef(canvas) {
    this.canvas = canvas;
    this.canvasCxt = this.canvas ? this.canvas.getContext("2d") : null;
  }

  toggleIsRecording() {
    const isRecording = !this.state.recording;
    this.setState({ recording: isRecording });
  }

  drawImagesOnCanvas() {

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json();
    }

    fetch('https://api.github.com/', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        console.log("FETCH", res);
      })
      .catch((err) => {
        console.error("ERROR", err);
      });

    setTimeout(() => {

      const { canvasCxt, canvas } = this;

      // canvasCxt.clearRect(0, 0, canvas.width, canvas.height);

      // const loadImages = (sources, callback) => {
      //   const images = {};
      //   let loadedImages = 0;
      //   let numImages = 0;
      //   for (let src in sources) {
      //     numImages += 1;
      //   }
      //   console.log(images, loadedImages, numImages);
      //   for (let src in sources) {
      //     images[src] = new Image();
      //     images[src].onload = () => {
      //       loadedImages += 1;
      //       if (loadedImages >= numImages) {
      //         callback(images);
      //       }
      //     };
      //     images[src].src = sources[src];
      //     console.log(images);
      //   }
      // }

      // const sources = {
      //   webcam: {
      //     image: this.capture(),
      //     x: 0,
      //     y: 0, 
      //     w: 325,
      //     h: 150
      //   },
      //   glasses: {
      //     image: encodedSunglasses,
      //     x: 200,
      //     y: 100, 
      //     w: 200,
      //     h: 25
      //   }
      // };

      // loadImages(sources, (images) => {
      //   console.log(images, 'images');
      //   canvasCxt.drawImage(images.webcam, images.webcam.x, images.webcam.y, images.webcam.w, images.webcam.h);
      //   canvasCxt.drawImage(images.glasses, images.glasses.x, images.glasses.y, images.glasses.w, images.glasses.h);
      // });

      const loadImage = url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`load ${url} fail`));
          img.src = url;
        });
      };

      const draw = obj => {
        const _obj = Object.assign({}, obj);
        return loadImage(_obj.src).then(img => {
          canvasCxt.drawImage(img, _obj.x, _obj.y, _obj.w, _obj.h);
        });
      };

      const images = [
        { src: this.capture(), x: 0, y: 0, w: 325, h: 150 }, // captured webcam image
        { src: encodedSunglasses, x: 200, y: 100, w: 200, h: 25 }, // sunglasses
      ];

      images.forEach(draw);
    }, 500);
  }

  takeSnapshot() {
    if (this.state.snapshot) {
      return this.setState({ snapshot: false });
    }
    this.setState({ snapshot: true });
    this.drawImagesOnCanvas();
  }

  capture() {
    return this.webcam.getScreenshot();
  }

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
              <canvas
                style={{
                  width: '400px',
                  height: '350px',
                  position: this.state.recording || this.state.snapshot ? 'relative' : 'fixed',
                  top: this.state.recording || this.state.snapshot ? null : -9999
                }}
                ref={(canvas) => this.setCanvasRef(canvas)}>
              </canvas>
              <Webcam
                style={{
                  position: this.state.recording || this.state.snapshot ? 'fixed' : 'relative',
                  top: this.state.recording || this.state.snapshot ? -9999 : null
                }}
                audio={false}
                width={400}
                height={350}
                ref={(webcam) => this.setWebcamRef(webcam)}
                screenshotFormat="image/png"
              />
              <div className="actionBtnWrapper">
                <button className="recordBtn" onClick={() => this.toggleIsRecording()}>
                  {this.state.recording ? "□" : "▹"}
                </button>
                <button className="snapshotBtn" onClick={() => this.takeSnapshot()}>
                  {this.state.snapshot ? "⦻" : "⊙"}
                </button>
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