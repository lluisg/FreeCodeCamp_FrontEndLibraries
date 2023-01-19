import React from 'react';
import PropTypes from "prop-types";
// import PropTypes from "https://cdn.skypack.dev/prop-types@15.8.1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr, faTwitter } from "@fortawesome/free-brands-svg-icons"


// ---------------------------------- QUOTE COMPONENTS ---------------------------------------

const TextQuoteComponent = (props) => {
  return (
    <div id="text" className="text-justify text-center">
      <i className="fa-solid fa-quote-left fa-lg" id="quote_marks"></i>
      <a>{props.text}</a>
    </div>
  );
};
TextQuoteComponent.defaultProps = { text: "Lorem ipsum rem i dont know" };
TextQuoteComponent.propTypes = { text: PropTypes.string.isRequired };

const AuthorComponent = (props) => {
  return (
    <div id="author" className="text-end pt-3">
      <a>- {props.author}</a>
    </div>
  );
};
AuthorComponent.defaultProps = { author: "Someone" };
AuthorComponent.propTypes = { author: PropTypes.string.isRequired };

const ButtonsComponent = () => {
  return (
    <div id="buttons-container" className="d-flex pt-3">
      <a className="btn m-1" id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" >
        <FontAwesomeIcon icon={faTumblr} />
      </a>
      <button className="btn m-1">
        <FontAwesomeIcon icon={faTwitter} />
      </button>
      <button className="btn ms-auto m-1" id="new-quote">
        New Quote
      </button>
    </div>
  );
};


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
  }

  render() {
    return (
      <div className="col-sm-4 p-0" id="quote-box">
        <div id="quote-container" className="bg-light p-5 rounded">
          <TextQuoteComponent text="If you do what you've always done, you'll get what you've always gotten." />
          <AuthorComponent author="Tony Robbins" />
          <ButtonsComponent />
        </div>
        <Footer />
      </div>
    );
  }
}


// ---------------------------------- RENDERING ---------------------------------------

// const root = ReactDOM.createRoot(document.getElementById("quote-box"));
// root.render(<QuoteBoxComponent />);
export default QuoteComponent;