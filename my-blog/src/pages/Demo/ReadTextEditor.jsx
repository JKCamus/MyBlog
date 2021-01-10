
// React
import React from 'react'
import ReactQuill from 'react-quill'

// import "react-quill/dist/quill.snow.css";
import './style.less'

class ReadTextEditor extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   content: props.content.htmlContent,
    //   theme: 'snow'
    //  } // You can also pass a Quill Delta here
  }

  render() {
    return (
      <div style={{backgroundColor:'#fff'}}>
            <ReactQuill value={ this.props.content.htmlContent }
                theme={'snow'}
                readOnly={true}
                className='readingmode'
                formats={ReadTextEditor.formats }
                modules={ReadTextEditor.modules}
                >
                <div className="readingmode"/>
            </ReactQuill>
      </div>
    )
  }
}


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

ReadTextEditor.modules = {
  syntax: true,
  toolbar: false,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
ReadTextEditor.formats = [
  'code-block', 'align',
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default ReadTextEditor
