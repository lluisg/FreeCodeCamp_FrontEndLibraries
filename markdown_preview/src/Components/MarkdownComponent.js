import React, { createElement } from 'react';
import PropTypes from "prop-types";
import {marked} from 'marked' // markdown interpreter
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons"
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

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

function Header(props) {
  return(
    <div id="header" className='border border-dark'>
      <a className="title p-1"><FontAwesomeIcon icon={faFreeCodeCamp} className="px-1" />{props.title}</a>
      <button id={props.id} onClick={() => props.Resize(props.id)} >
      {(props.size=='None')  ? <FontAwesomeIcon icon={faMaximize} className='p-2 resize-btn' />
                            : <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className="p-2 resize-btn" />
      }
      </button>
    </div>
  );
}

const Editor = (props) => {
  return (
    <div id="editor-div" className="p-0 my-3">
      <Header title="Editor" id="editor-resize" size={props.size} Resize={props.Resize} />
      <textarea className='p-0 m-0 border border-dark' id="editor" rows="4" cols="50" value={props.text} onChange={props.handleChange}>Some code</textarea>
    </div>
    );
};
// Editor.defaultProps = { text:'blue' };
Editor.propTypes = { text: PropTypes.string.isRequired };

const Previewer = (props) => {
  return (
    <div id="preview-div" className="p-0 mb-3">
      <Header title="Previewer" id="preview-resize" size={props.size} Resize={props.Resize} />
      <div id="preview" className='p-0 pt-2 m-0 border border-dark' dangerouslySetInnerHTML={props.markdown} />
    </div>
  );
};
// Previewer.defaultProps = { getMarkdown:'blue' };
// Previewer.propTypes = { getMarkdown: PropTypes.string.isRequired };


// ---------------------------------- CENTRAL COMPONENT ---------------------------------------

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getMarkdown = this.getMarkdown.bind(this);
    this.Resize = this.Resize.bind(this);
  }

  getMarkdown() {
    let x = marked(this.props.input);
    return {__html : x};
  }

  handleChange (event) {
    this.props.submitChangeText(event.target.value)
  }

  changeClass(size){
    // change the class to put on big and hide the other div
    var editor = document.getElementById("editor-div");
    var previewer = document.getElementById("preview-div");
    console.log(editor)
    console.log(previewer)

    if(size == 'None'){
      editor.classList.remove("hidden", "maximized");
      previewer.classList.remove("hidden", "maximized");
    }else if(size == 'editor-resize'){
      editor.classList.add("maximized");
      previewer.classList.add("hidden");
    }else{
      editor.classList.add("hidden");
      previewer.classList.add("maximized");
    };
  }

  Resize (id) {
    let state_updated = this.props.window

    if (this.props.window == id){
      // if the isBig is the same as the id means it was already big and needs to be small
      this.props.submitChangeWindow('None')
      state_updated = 'None'
    }else{
      this.props.submitChangeWindow(id)
      state_updated = id
    }
    this.changeClass(state_updated, state_updated)
  };

  componentDidMount(){
    // const startingText = "# Welcome to my React Markdown Previewer! \n ## This is a sub-heading... \n ### And here's some other cool stuff: \n Heres some code, `<div></div>`, between 2 backticks. \n ``` \n // this is multi-line code: \n function anotherExample(firstLine, lastLine) { \n if (firstLine == '```' && lastLine == '```') { \n return multiLineCode; \n } \n } \n ``` \n You can also make text **bold**... whoa! \n Or _italic_. \n Or... wait for it... **_both!_** \n And feel free to go crazy ~~crossing stuff out~~. \n There's also [links](https://www.freecodecamp.org), and \n > Block Quotes! \n And if you want to get really crazy, even tables: \n Wild Header | Crazy Header | Another Header? \n ------------ | ------------- | ------------- \n Your content can | be here, and it | can be here.... \n And here. | Okay. | I think we get it. \n - And of course there are lists. \n   - Some are bulleted. \n      - With different indentation levels. \n         - That look like this. \n 1. And there are numbered lists too. \n 1. Use just 1s if you want! \n 1. And last but not least, let's not forget embedded images: \n ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
    const startingText = "# Welcome to my React Markdown Previewer! \n ## This is a sub-heading... \n ### And here's some other cool stuff: \n Heres some code, `<div></div>`, between 2 backticks. \n ``` \n // this is multi-line code: \n function anotherExample(firstLine, lastLine) { \n if (firstLine == '```' && lastLine == '```') { \n return multiLineCode; \n } \n } \n ``` \n You can also make text **bold**... whoa! \n Or _italic_. \n Or... wait for it... **_both!_** \n And feel free to go crazy ~~crossing stuff out~~. \n There's also [links](https://www.freecodecamp.org), and \n > Block Quotes! \n And if you want to get really crazy, even tables: \n Wild Header | Crazy Header | Another Header? \n ------------ | ------------- | ------------- \n Your content can | be here, and it | can be here.... \n And here. | Okay. | I think we get it. \n - And of course there are lists. \n   - Some are bulleted. \n      - With different indentation levels. \n         - That look like this. \n 1. And there are numbered lists too. \n 1. Use just 1s if you want! \n 1. And last but not least, let's not forget embedded images:"
    this.props.submitChangeText(startingText)
  };
  
  render() {
    return (
      <div className="container-base p-0">
        <Editor text={this.props.input} handleChange={this.handleChange} size={this.props.window} Resize={this.Resize} />
        <Previewer markdown={this.getMarkdown()} size={this.props.window} Resize={this.Resize} />
      </div>
    );
  }
};

export default MarkdownPreviewer;
// ReactDOM.render(<MarkdownPreviewer />, document.getElementById("root"));