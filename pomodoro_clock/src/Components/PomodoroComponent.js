import React, { createElement, useState } from 'react';
import PropTypes from "prop-types";
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faPlay, faPause, faRotate } from "@fortawesome/free-solid-svg-icons"

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

const Title = (props) => {
  return (
    <div id="title" className='m-2'>
      <p className='p-0 m-0'>25 + 5 Clock</p>
    </div>
    );
};
// Title.defaultProps = { formula:'5 + 9', value: '3' };
// Title.propTypes = { formula: PropTypes.string.isRequired, value: PropTypes.string.isRequired};

const TimeComponents = (props) => {
  return (
    <div id="time-components" className=''>
      <TimeComponent name='break' click={props.handleClick} value={props.breakValue} />
      <TimeComponent name='session' click={props.handleClick} value={props.sessionValue} />
    </div>
  );
};
// TimeComponents.defaultProps = { formula:'5 + 9', value: '3' };
// TimeComponents.propTypes = { formula: PropTypes.string.isRequired, value: PropTypes.string.isRequired};

function TimeComponent(props){
  return(
    <div id={props.name} className=''>
      <p id={props.name+'-label'} className='m-0'>{props.name.slice(0,1).toUpperCase()+props.name.slice(1)} Length</p>
      <div className='control-btns'>
        <a id={props.name+'-decrement'} className='arrow btn-time' onClick={()=>props.click(props.name, 'decrease')}><FontAwesomeIcon icon={faArrowDown} /></a>
        {/* <a id={props.name+'-decrement'} className='arrow btn-time' onClick={()=>props.click(props.name, 'decrease')}>-</a> */}
        <div id={props.name+'-length'} className='mx-2 btn-time'>{props.value}</div>
        <a id={props.name+'-increment'} className='arrow btn-time' onClick={()=>props.click(props.name, 'increase')}><FontAwesomeIcon icon={faArrowUp} /></a>
        {/* <a id={props.name+'-increment'} className='arrow btn-time' onClick={()=>props.click(props.name, 'increase')}>+</a> */}
      </div>
    </div>
  );
}

const Clock = (props) => {
  return (
    <div id='clock-container' className="my-3 p-0">
      <p id="timer-label" className='mt-3 mb-0'>{props.name}</p>
      <p id="time-left" className='px-5 p-0 m-0 mb-3'>{props.value}</p>
    </div>
  );
};
// Clock.defaultProps = { formula:'5 + 9', value: '3' };
// Clock.propTypes = { formula: PropTypes.string.isRequired, value: PropTypes.string.isRequired};

const Buttons = (props) => {
  return (
    <div id='btns-container' className="">
      <p id="start_stop" className='' onClick={props.handleStartStop}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></p>
      {/* <p id="start_stop" className='' onClick={props.handleStartStop}>Play/Stop</p> */}
      <p id="reset" className='' onClick={props.handleRestart}><FontAwesomeIcon icon={faRotate} /></p>
      {/* <p id="reset" className='' onClick={props.handleRestart}>Restart</p> */}
    </div>
    );
};
// Buttons.defaultProps = { formula:'5 + 9', value: '3' };
// Buttons.propTypes = { formula: PropTypes.string.isRequired, value: PropTypes.string.isRequired};


// ---------------------------------- CENTRAL COMPONENT ---------------------------------------

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleClick(element, increase) {
    if(!this.props.clock_running){
      if(element=='break'){
        if (increase == 'increase' && this.props.break < 60){
          this.props.submitIncreaseBreak()
        }else if(increase=='decrease' && this.props.break > 1){
          this.props.submitDecreaseBreak()
        }
      }else if(element=='session'){
        if (increase == 'increase' && this.props.session < 60){
          this.props.submitIncreaseSession()
          this.props.submitUpdateTimer()
          this.props.submitUpdateClock()
        }else if(increase=='decrease' && this.props.session > 1){
          this.props.submitDecreaseSession()
          this.props.submitUpdateTimer()
          this.props.submitUpdateClock()
        }
      }  
    }
  }

  handleRestart() {
    this.props.submitRestartClock()
    let audio = document.getElementById('beep')
    audio.pause();
    audio.currentTime = 0;
  }

  handleStartStop() {
    this.props.submitStartStopClock()
    let isRunning = !this.props.clock_running

    let countdown
    if(isRunning){
      countdown = setInterval(() => {
        if(this.props.clock_running){
          this.countDown()
        }else{
          clearInterval(countdown)
        }
      }, 1000)
    }
  }

  countDown(){
    let time = this.props.timer
    this.props.submitDecreaseCount()
    this.props.submitUpdateClock()

    if (time == 0){
      if(this.props.current == 'Session'){
        this.props.submitChangeCurrent('Session')
        this.props.submitUpdateTimer()
        this.props.submitUpdateClock()
      }else if(this.props.current == 'Break'){
        this.props.submitChangeCurrent('Break')
        this.props.submitUpdateTimer()
        this.props.submitUpdateClock()
      }
      let audio = document.getElementById('beep')
      audio.play();
    }
  }

  componentDidMount(){
    this.handleRestart();
  }

  render() {
    return (
      <div className="base-container">
        <a id="link_original" href="https://25--5-clock.freecodecamp.rocks/" target="_blank">original web</a>
        <div className='container-pomodoro p-1'>
          <Title />
          <TimeComponents breakValue={this.props.break} sessionValue={this.props.session} handleClick={this.handleClick} />
          <Clock name={this.props.current} value={this.props.clock} />
          <Buttons handleStartStop={this.handleStartStop} handleRestart={this.handleRestart} />
          <a id="signed">Coded by<br/><span>Lluis Guardia</span></a>
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      </div>
    );
  }
};

export default PomodoroClock;
// ReactDOM.render(<PomodoroClock />, document.getElementById("root"));