import React, { createElement } from 'react';
import PropTypes from "prop-types";
// import icons fontawesome
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons"

import sounds from "./sounds"

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

const ButtonsDrum = (props) => {
  return (
    <button id={props.sound} onClick={()=>props.handleClick(props.sound, props.letter)} className="drum-pad btn">
      {props.letter}
      <audio id={props.letter} src={props.src} className="clip"></audio>
    </button>
  );
};
// Editor.defaultProps = { text:'blue' };
// ButtonsDrum.propTypes = { text: PropTypes.string.isRequired };

const Options = (props) => {
  return (
    <div className="options-container p-0 m-0">
      <a id="display">{props.value}</a>
    </div>
    );
};


// ---------------------------------- CENTRAL COMPONENT ---------------------------------------

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_sound: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
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
      current_sound: song
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
  
  render() {
    const drumpads = sounds.map(element => {  return  <ButtonsDrum  key={element.id}
                                                                    sound={element.sound}
                                                                    letter={element.key}
                                                                    src={element.src}
                                                                    handleClick={this.handleClick}
                                                      />
                                              });
    return (
      <div className="base-container">
        <div id="drum-machine">
          <div className="grid-btns">
            {drumpads}
          </div>
          <Options value={this.state.current_sound} />
        </div>
      </div>
    );
  }
};

export default DrumMachine;
// ReactDOM.render(<DrumMachine />, document.getElementById("root"));