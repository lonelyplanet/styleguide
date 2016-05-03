import React from "react";

export default class Editor extends React.Component {
  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
    this.editor = window.CodeMirror.fromTextArea(this.refs.editor, {
      lineNumbers: true,
      readOnly: false,
    });

    this.editor.on("change", this._onChange);
  }
  _onChange() {
    this.props.onChange(this.editor.getValue());
  }
  render() {
    const { value } = this.props;

    return (
      <textarea
        ref="editor"
        defaultValue={value}
      />
    );
  }
}

Editor.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
};

export default Editor;
