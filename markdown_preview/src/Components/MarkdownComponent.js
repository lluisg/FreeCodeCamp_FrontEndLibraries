import React from 'react';
import PropTypes from "prop-types";
import {marked} from 'marked' // markdown interpreter
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons"
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons"

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});


function Header(props) {
  return(
    <div id="header">
      <a className="title p-1"><FontAwesomeIcon icon={faFreeCodeCamp} className="px-1" />{props.title}</a>
      <FontAwesomeIcon icon={faMaximize} className="p-2" />
    </div>
  );
}


const Editor = (props) => {
  return (
    <div className="editor-div border border-dark p-0 my-3">
      <Header title="Editor" />
      <textarea className='p-0 m-0' id="editor" rows="4" cols="50" value={props.text} onChange={props.handleChange}>Some code</textarea>
    </div>
    );
};
// Editor.defaultProps = { text:'blue' };
Editor.propTypes = { text: PropTypes.string.isRequired };

const Previewer = (props) => {
  return (
    <div className="preview-div border border-dark p-0 mb-3">
      <Header title="Previewer" />
      {/* <div id="preview" dangerouslySetInnerHTML={props.getMarkdown} /> */}
    </div>
  );
};
// Previewer.defaultProps = { getMarkdown:'blue' };
// Previewer.propTypes = { getMarkdown: PropTypes.string.isRequired };




class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMarkdown = this.getMarkdown.bind(this);
  }

  getMarkdown() {
    let x = marked(this.state.input);
    return {__html : x};
  }

  handleChange (event) {
    this.setState({
      input: event.target.value,
    });
    console.log(this.state.clean_input)
  }

  componentDidMount(){
    // const startingText = "# Welcome to my React Markdown Previewer! \n ## This is a sub-heading... \n ### And here's some other cool stuff: \n Heres some code, `<div></div>`, between 2 backticks. \n ``` \n // this is multi-line code: \n function anotherExample(firstLine, lastLine) { \n if (firstLine == '```' && lastLine == '```') { \n return multiLineCode; \n } \n } \n ``` \n You can also make text **bold**... whoa! \n Or _italic_. \n Or... wait for it... **_both!_** \n And feel free to go crazy ~~crossing stuff out~~. \n There's also [links](https://www.freecodecamp.org), and \n > Block Quotes! \n And if you want to get really crazy, even tables: \n Wild Header | Crazy Header | Another Header? \n ------------ | ------------- | ------------- \n Your content can | be here, and it | can be here.... \n And here. | Okay. | I think we get it. \n - And of course there are lists. \n   - Some are bulleted. \n      - With different indentation levels. \n         - That look like this. \n 1. And there are numbered lists too. \n 1. Use just 1s if you want! \n 1. And last but not least, let's not forget embedded images: \n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
    const startingText = "# Welcome to my React Markdown Previewer! \n ## This is a sub-heading... \n ### And here's some other cool stuff: \n Heres some code, `<div></div>`, between 2 backticks. \n ``` \n // this is multi-line code: \n function anotherExample(firstLine, lastLine) { \n if (firstLine == '```' && lastLine == '```') { \n return multiLineCode; \n } \n } \n ``` \n You can also make text **bold**... whoa! \n Or _italic_. \n Or... wait for it... **_both!_** \n And feel free to go crazy ~~crossing stuff out~~. \n There's also [links](https://www.freecodecamp.org), and \n > Block Quotes! \n And if you want to get really crazy, even tables: \n Wild Header | Crazy Header | Another Header? \n ------------ | ------------- | ------------- \n Your content can | be here, and it | can be here.... \n And here. | Okay. | I think we get it. \n - And of course there are lists. \n   - Some are bulleted. \n      - With different indentation levels. \n         - That look like this. \n 1. And there are numbered lists too. \n 1. Use just 1s if you want! \n 1. And last but not least, let's not forget embedded images:"
    this.setState({
      input: startingText
    });
  };
  
  render() {
    return (
      <div className="container-base border border-danger p-0">
        <Editor text={this.state.input} handleChange={this.handleChange} />
        <Previewer getMarkdown={this.getMarkdown} />
      </div>
    );
  }
};

export default MarkdownPreviewer;
// ReactDOM.render(<MarkdownPreviewer />, document.getElementById("root"));