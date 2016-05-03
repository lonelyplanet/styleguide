import { connect } from "react-redux";
import React from "react";
import Editor from "./editor";
import Heading from "guidebook-react/dist/components/heading";
import * as actions from "../actions/styles";

class Container extends React.Component {
  constructor() {
    super();

    this.state = {
      styles: {},
    };

    this.updateStyles = this.updateStyles.bind(this);
  }
  updateStyles(name, code) {
    try {
      const styles = JSON.parse(code);

      // this.props.dispatch(actions.updateStyles(name, styles));

      Object.assign(this.props.Component.styles, styles);

      this.setState({
        styles
      });
    } catch (e) {
      console.log("Could not update styles %s", e.message);
    }
  }
  render() {
    const {
      displayName,
      name,
      Component,
      propTypes,
      props,
      dispatch,
      id,
    } = this.props;

    const navStyle = {
      textAlign: "center",
      margin: "2rem auto",
    };
    const navItemStyle = {
      display: "inline-block",
      listStyle: "none",
      marginRight: "1rem",
    };

    return (
      <div className="ComponentContainer">
        <Heading
          level={3}
          size="large"
          weight="thin"
          override={{ textAlign: "center", marginBottom: "2rem" }}
        >
          &lt;{displayName} /&gt;
        </Heading>

        <Heading
          level={5}
          size="medium"
          weight="thin"
          override={{ marginTop: "5rem", textAlign: "center" }}
        >
          PropTypes
        </Heading>

        <ul style={navStyle}>
        {propTypes.map((name) => (
          <li style={navItemStyle}>{name}</li>
        ))}
        </ul>

        <Component {...props} />

        {Component.styles &&
          <div>
            <Heading
              level={5}
              size="medium"
              weight="thin"
              override={{ marginBottom: "1rem", marginTop: "5rem", textAlign: "center" }}
            >
              Styles
            </Heading>

            <Editor
              value={JSON.stringify(Component.styles, null, 2)}
              onChange={(code) => this.updateStyles(name, code)}
            />
          </div>
          }
      </div>
    );
  }
}

export default connect()(Container);
