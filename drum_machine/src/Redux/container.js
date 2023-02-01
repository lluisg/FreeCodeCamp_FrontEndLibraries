import { connect } from 'react-redux';

import DrumComponent from '../Components/DrumComponent';
import { changeText, changeVolume, changePower, changeBank } from './actions'

const mapStateToProps = state => {
  return {
    start_text: state.start_text,
    text: state.text,
    volume: state.volume,
    power: state.power,
    bank: state.bank
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitChangeText: (input) => {dispatch(changeText(input))},
    submitChangeVolume: (volume) => {dispatch(changeVolume(volume))},
    submitChangePower: () => {dispatch(changePower())},
    submitChangeBank: (bank) => {dispatch(changeBank(bank))},
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(DrumComponent);