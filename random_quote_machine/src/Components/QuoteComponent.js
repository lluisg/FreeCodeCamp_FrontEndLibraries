import React from 'react';
import PropTypes from "prop-types";
// import PropTypes from "https://cdn.skypack.dev/prop-types@15.8.1";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr, faTwitter } from "@fortawesome/free-brands-svg-icons"
import randomColor from "randomcolor";

import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

// ---------------------------------- QUOTE COMPONENTS ---------------------------------------

const TextQuoteComponent = (props) => {
  return (
    <div id="text" className="text-justify text-center" style={{opacity:props.op}}>
      <i className="fa-solid fa-quote-left fa-lg" id="quote_marks" style={{color: props.color}}></i>
      <a style={{color: props.color}}>{props.text}</a>
    </div>
  );
};
TextQuoteComponent.defaultProps = { text: "Lorem ipsum rem i dont know", op:1, color:"blue" };
TextQuoteComponent.propTypes = { text: PropTypes.string.isRequired, op: PropTypes.number.isRequired, color: PropTypes.string.isRequired };

const AuthorComponent = (props) => {
  return (
    <div id="author" className="text-end pt-3" style={{opacity:props.op}}>
      <a style={{color: props.color}}>- {props.author}</a>
    </div>
  );
};
AuthorComponent.defaultProps = { author: "Someone", op:1, color:'blue' };
AuthorComponent.propTypes = { author: PropTypes.string.isRequired, op: PropTypes.number.isRequired, color: PropTypes.string.isRequired };

const ButtonsComponent = (props) => {
  return (
    <div id="buttons-container" className="d-flex pt-3">
      <a className="btn m-1" id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" style={{backgroundColor: props.color}}>
        <FontAwesomeIcon icon={faTumblr} />
      </a>
      <button className="btn m-1" style={{backgroundColor: props.color}}>
        <FontAwesomeIcon icon={faTwitter} />
      </button>
      <button className="btn ms-auto m-1" id="new-quote" onClick={props.onClick} style={{backgroundColor: props.color}}>
        New Quote
      </button>
    </div>
  );
};
ButtonsComponent.defaultProps = { color:'blue' };
ButtonsComponent.propTypes = { color: PropTypes.string.isRequired };


// ---------------------------------- FOOTER ---------------------------------------

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center">
        <a id="my_ident">by Lluis</a>
      </div>
    );
  }
}


// ---------------------------------- QUOTE BLOCK ---------------------------------------

class QuoteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      author : "Tony Robbins",
      quote : "If you do what you've always done, you'll get what you've always gotten.",
      opacity : 1,
      color: 'blue'
    };

    this.loadQuote = this.loadQuote.bind(this);
  };

  async callAPI() {
    let quote = {text: "Unknown", author: "Unknown"}
    console.log('Calling API')
    await fetch("https://api.quotable.io/random?maxLength=50")
        .then((response) => response.json())
        .then((data) => {
          quote = {
            text: data.content,
            author: data.author
          }
        });
    return quote;
  };

  loadQuote(){
    this.setState({
      opacity: 0
    });

    setTimeout(() => {
      let rand_color = randomColor()
      this.callAPI().then((quote) => {
        console.log('New quote:', quote)
        this.setState({
          author: quote.author,
          quote: quote.text,
          opacity: 1,
          color: rand_color
        });
      });
    }, 500);
  }

  componentDidMount(){
    this.loadQuote();
    console.log('Component Mounted');
  };


  render() {
    return (
      <div className="container-fluid h-100" style={{backgroundColor:this.state.color}} id="container-page">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-sm-4 p-0" id="quote-box">
            <div id="quote-container" className="bg-light p-5 rounded">
              <TextQuoteComponent text={this.state.quote} op={this.state.opacity} color={this.state.color} />
              <AuthorComponent author={this.state.author} op={this.state.opacity} color={this.state.color} />
              <ButtonsComponent onClick={this.loadQuote} color={this.state.color} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}


// ---------------------------------- RENDERING ---------------------------------------

// const root = ReactDOM.createRoot(document.getElementById("quote-box"));
// root.render(<QuoteBoxComponent />);
export default QuoteComponent;