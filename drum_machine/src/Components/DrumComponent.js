import React, { createElement } from 'react';
import PropTypes from "prop-types";
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons"

import sounds from "./sounds"

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

const ButtonsDrum = (props) => {
  return (
    <button id={props.sound} onClick={()=>props.handleClick(props.sound, props.letter)} className="drum-pad">
      <b>{props.letter}</b>
      <audio id={props.letter} src={props.src} className="clip"></audio>
    </button>
  );
};
// Editor.defaultProps = { text:'blue' };
// ButtonsDrum.propTypes = { text: PropTypes.string.isRequired };

const Options = (props) => {
  return (
    <div className="options-container p-0 m-0">
      <ButtonOption name="Power" onClick={props.changePower} />
      <p id="display" className='my-3'>{props.value}</p>
      <Slider volume={props.volume} onChange={props.changeVolume} />
      <ButtonOption name="Bank" onClick={props.changeBank} />
    </div>
    );
};

function Slider(props) {
  return(
    <input id="slider" type="range" min="0" max="100" step="1" value={props.volume} onChange={props.onChange} />
  );
}

function ButtonOption(props) {
  return(
    <div id={props.name} className='btn-onoff mt-3 mb-1'>
      <p className='p-0 m-0'><b>{props.name}</b></p>
      <div className="container-onoff p-1">
        <div id={props.name=='Power'?'power-btn-off':'bank-btn-off'} className="btn-off hide-btn" onClick={props.onClick}></div>
        <div id={props.name=='Power'?'power-btn-on':'bank-btn-on'} className="btn-on" onClick={props.onClick}></div>
      </div>
    </div>
  );
}


// ---------------------------------- CENTRAL COMPONENT ---------------------------------------

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.changeBank = this.changeBank.bind(this);
    this.changePower = this.changePower.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  handleClick(song, key) {
    const btn_pressed = document.getElementById(song)
    btn_pressed.classList.add('btn-active')
    setTimeout(() => {
      btn_pressed.classList.remove('btn-active')
    }, 200);  

    if (this.props.power){
      const audio = document.getElementById(key)
      audio.volume = this.props.volume/100;
      audio.play()
 
      this.props.submitChangeText(song)
    }
  };

  handleKey(e){
    const press = sounds[this.props.bank].find(
      item => item.key === e.key.toUpperCase()
    );
    if (press){
      const btn_pressed = document.getElementById(press.sound);
      btn_pressed.click();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKey);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKey);
  }

  changeButtonPosition(id_on, id_off, condition){
    let btnon = document.getElementById(id_on)
    let btnoff = document.getElementById(id_off)

    if(condition){
      btnon.classList.add("hide-btn");
      btnoff.classList.remove("hide-btn");
    }else{
      btnon.classList.remove("hide-btn");
      btnoff.classList.add("hide-btn");
    }
  }

  changeBank(){
    this.changeButtonPosition('bank-btn-on', 'bank-btn-off', this.props.bank=='Smooth Piano Kit')

    this.props.bank === 'Heater Kit'
      ? this.props.submitChangeBank('Smooth Piano Kit')
      : this.props.submitChangeBank('Heater Kit')
    console.log('change bank')
  }

  changePower(){
    this.changeButtonPosition('power-btn-on', 'power-btn-off', this.props.power)
    this.props.submitChangePower();
    console.log('change power')
  }

  changeVolume(e){
    this.props.submitChangeVolume(e.target.value)
  }

  render() {
    const drumpads = sounds[this.props.bank].map(element => {  return  <ButtonsDrum key={element.id}
                                                                                            sound={element.sound}
                                                                                            letter={element.key}
                                                                                            src={element.src}
                                                                                            handleClick={this.handleClick}
                                                      />
                                              });
    return (
      <div className="base-container">
      <a id="link_original" href="https://drum-machine.freecodecamp.rocks/" target="_blank">original web</a>
        <div className='container-drum'>
          <a className="logo">FCC<FontAwesomeIcon icon={faFreeCodeCamp} className="" /></a>
          <div id="drum-machine">
            <div className="grid-btns p-0 m-4">
              {drumpads}
            </div>
            <Options value={this.props.text} volume={this.props.volume} changePower={this.changePower} changeBank={this.changeBank} changeVolume={this.changeVolume} />
          </div>
        </div>
      </div>
    );
  }
};

export default DrumMachine;
// ReactDOM.render(<DrumMachine />, document.getElementById("root"));