import React, { Component, PropTypes } from 'react';
import Webcam from 'react-webcam';
import Slider from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import './styles.sass';

class DemoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      snapshot: false,
      lipstick: null,
    };
    setInterval(function () {
      if (this.state.recording) {
        this.drawImagesOnCanvas(this.props.type);
      }
    }.bind(this), 500);
  }

  componentDidMount() {
    this.setSwatchColor("pink", 255, 94, 230);
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

  setSliderRef(slider) {
    this.slider = slider;
  }

  toggleIsRecording() {
    this.canvasCxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const isRecording = !this.state.recording;
    this.setState({ recording: isRecording });
  }

  drawImagesOnCanvas(itemType) {

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json();
    }

    const encodedImage = this.capture();
    const { canvasCxt, canvas } = this;

    const sliderValue = (this.slider ? this.slider.state.value : 50);
    const scale = 2 / 50 * sliderValue;
    console.time("RENDER REQUEST");

    let pathParam = 'render';
    let reqPayload = {
      image: encodedImage.replace("data:image/png;base64,", ""),
      type: itemType, // not used for lipstick
      scale, // not used for lipstick
    };

    if (this.props.type === 'lipstick') {
      const { r, g, b, alpha } = this.state.lipstick;
      pathParam = 'lipstick';
      reqPayload = Object.assign(reqPayload, { r, g, b, alpha });
    }

    fetch('http://localhost:5000/' + pathParam, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqPayload)
    }).then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        console.timeEnd("RENDER REQUEST");
        const loadImage = url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(new Error(`load ${url.slice(0, 60)} fail`));
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
          {
            src: "data:image/png;base64," + res.image,
            x: 0,
            y: 0,
            w: 325, 
            h: 150
          }
        ];

        images.forEach(draw);
      })
      .catch((err) => console.error("ERROR", err));
  }

  takeSnapshot() {
    this.canvasCxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.state.snapshot) {
      return this.setState({ snapshot: false });
    }
    this.setState({ snapshot: true });
    this.drawImagesOnCanvas(this.props.type);
  }

  capture() {
    return this.webcam ? this.webcam.getScreenshot() : null;
  }

  setSwatchColor(color, r, g, b) {
    this.setState({
      activeColor: color,
      lipstick: {
        r,
        g,
        b,
        alpha: this.slider.state.value / 100,
      }
    });
  }

  render() {
    const colorRgb = {
      pink: { r: 255, g: 94, b: 230 },
      white: { r: 252, g: 246, b: 242 },
      red: { r: 255, g: 68, b: 68 },
      orange: { r: 244, g: 146, b: 65 },
      yellow: { r: 241, g: 244, b: 66},
      green: { r: 142, g: 255, b: 94 },
      blue: { r: 66, g: 134, b: 244 },
      purple: { r: 172, g: 65, b: 244 },
      black: { r: 38, g: 35, b: 35 }
    };

    const colors = ["pink", "white", "red", "orange", "yellow", "green", "blue", "purple", "black"];
    const colorSwatches = 
      colors.map((color) => {
        const rgb = colorRgb[color];
        return (
          <div
            key={color}
            className={`swatch ${color} ${this.state.activeColor === color ? "active" : null}`}
            onClick={() => this.setSwatchColor(color, rgb.r, rgb.g, rgb.b)}>
          </div>
        )
      });

    return (
      <div className="addItemWrapper" ref={node => { this.modalWrapper = node; }}>
        <div className="hider" />
        <div className="modal">
          <div className="heading">
            <h3>{this.props.name}</h3>
          </div>
          <div className="itemWrapper">
            <div className="itemPicWrapper">
              <canvas
                style={{
                  width: '450px',
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
                width={600}
                height={350}
                ref={(webcam) => this.setWebcamRef(webcam)}
                screenshotFormat="image/png"
              />
              {
                this.props.type === 'lipstick' ? (<div className="swatchWrapper">{colorSwatches}</div>) : null
              }
              <Slider style={{ margin: '20px 0 5px 0' }} defaultValue={50} ref={(slider) => this.setSliderRef(slider)}/>
              <div className="actionBtnWrapper">
                <button className="recordBtn" onClick={() => this.toggleIsRecording()}>
                  {this.state.recording ? "□" : "▹"}
                </button>
                <button style={{ display: "none" }} className="snapshotBtn" onClick={() => this.takeSnapshot()}>
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