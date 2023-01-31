import React, { createElement } from 'react';
import PropTypes from "prop-types";
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons"

import sounds from "./sounds"

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

const ButtonsDrum = (props) => {
  return (
    <button id={props.sound} onClick={()=>props.handleClick(props.sound, props.letter)} className="drum-pad p-4 rounded border-0">
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
      <a className="logo">FCC<FontAwesomeIcon icon={faFreeCodeCamp} className="" /></a>
      <ButtonOption name="Power" onClick={props.changePower} />
      <p id="display" className='my-3'>{props.value}</p>
      <Slider onChange={props.changeVolume} />
      <ButtonOption name="Bank" onClick={props.changeBank} />
    </div>
    );
};

function Slider(props) {
  return(
    <input type="range" min="1" max="100" value="50" onChange={()=>props.onChange(this.value)} />
  );
}

function ButtonOption(props) {
  return(
    <div id={props.name} className='btn-onoff mt-3'>
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
    this.state = {
      start_text: '... ',
      current_text: '... ',
      current_bank: 'Smooth Piano Kit',
      power: true,
      volume: 50
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.changeBank = this.changeBank.bind(this);
    this.changePower = this.changePower.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  handleClick(song, key) {
    const audio = document.getElementById(key)
    audio.play()

    const btn_pressed = document.getElementById(song)
    btn_pressed.classList.add('using-sound')
    setTimeout(() => {
      btn_pressed.classList.remove('using-sound')
      
    }, 500);
    

    this.setState({
      current_text: song
    })
  };

  handleKey(e){
    const press = sounds.find(
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
      // console.log('on->off')
      btnon.classList.add("hide-btn");
      btnoff.classList.remove("hide-btn");
    }else{
      // console.log('off->on')
      btnon.classList.remove("hide-btn");
      btnoff.classList.add("hide-btn");
    }

  }

  changeBank(){
    this.changeButtonPosition('bank-btn-on', 'bank-btn-off', this.state.current_bank=='Smooth Piano Kit')

    this.state.current_bank === 'Heater Kit'
      ? this.setState({current_bank: 'Smooth Piano Kit', current_text: 'Smooth Piano Kit'})
      : this.setState({current_bank: 'Heater Kit', current_text: 'Heater Kit'})
    console.log('change bank')
  }

  changePower(){
    this.changeButtonPosition('power-btn-on', 'power-btn-off', this.state.power)

    this.setState({
      power: !this.state.power,
      current_text: this.state.start_text
    });
    console.log('change power')
  }

  changeVolume(volume){
    this.setState({
      volume: volume,
      current_text: 'Volume: '+volume
    })
  }

  render() {
    const drumpads = sounds[this.state.current_bank].map(element => {  return  <ButtonsDrum key={element.id}
                                                                                            sound={element.sound}
                                                                                            letter={element.key}
                                                                                            src={element.src}
                                                                                            handleClick={this.handleClick}
                                                      />
                                              });
    return (
      <div className="base-container">
        <div id="drum-machine">
          <div className="grid-btns p-0 m-4">
            {drumpads}
          </div>
          BUTTONS QUAN CLICKES
          SLIDER
          CANVIAR LOGO I TITOL DE LA WEB DE TOTS ELS PROJECTES FINS ARA, ESTA EL PREDETERMINAT DE REACT
          <Options value={this.state.current_text} changePower={this.changePower} changeBank={this.changeBank} changeVolume={this.changeVolume} />
        </div>
      </div>
    );
  }
};

export default DrumMachine;
// ReactDOM.render(<DrumMachine />, document.getElementById("root"));