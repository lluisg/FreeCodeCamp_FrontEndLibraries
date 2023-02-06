import { connect } from 'react-redux';

import PomodoroComponent from '../Components/PomodoroComponent';
import { increaseBreak, decreaseBreak, increaseSession, decreaseSession, startStopClock, restartClock, changeCurrent, updateTimer, updateClock, decreaseCount } from './actions'

const mapStateToProps = state => {
  return {
    break: state.break,
    session: state.session,
    timer: state.timer,
    clock: state.clock,
    current: state.current,
    clock_running: state.clock_running
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitIncreaseBreak: () => {dispatch(increaseBreak())},
    submitDecreaseBreak: () => {dispatch(decreaseBreak())},
    submitIncreaseSession: () => {dispatch(increaseSession())},
    submitDecreaseSession: () => {dispatch(decreaseSession())},
    submitStartStopClock: () => {dispatch(startStopClock())},
    submitRestartClock: () => {dispatch(restartClock())},
    submitChangeCurrent: () => {dispatch(changeCurrent())},
    submitUpdateTimer: () => {dispatch(updateTimer())},
    submitUpdateClock: () => {dispatch(updateClock())},
    submitDecreaseCount: () => {dispatch(decreaseCount())},
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(PomodoroComponent);