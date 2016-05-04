import { connect } from "react-redux";
import React from "react";
import { StyleRoot } from "radium";
import PageHeader from "guidebook-react/dist/components/pageHeader";
import Container from "./container";

const createId = (string) => string
  .toLowerCase()
  .replace(":", "")
  .replace(" ", "-");

class Styleguide extends React.Component {
  render() {
    const { components } = this.props;

    const listStyle = {
      listStyle: "none",
      maxWidth: "80rem",
      margin: "5rem auto",
    };
    const navStyle = {
      textAlign: "center",
      margin: "2rem auto",
    };
    const navItemStyle = {
      display: "inline-block",
      listStyle: "none",
      marginRight: "1rem",
    };

    const nav = components.map((c, i) => {
      const name = c.name;

      return (
        <li style={navItemStyle} key={name}>
          <a href={`#${createId(name)}`}>
            {name}
          </a>
          {components.length - 1 !== i &&
            <span style={{ paddingLeft: "1rem" }}>
              &bull;
            </span>
          }
        </li>
      );
    });

    const list = components.map((comp, i) => {
      const Component = comp.Component || require("guidebook-react/dist/components/" + comp.path).default;
      const propTypes = Object.keys(comp.props || {});
      const props = comp.lpProps;

      return (
        <li key={comp.name} id={comp.name.toLowerCase()} style={listStyle}>

          <div style={{ textAlign: "center" }}>
            <Container
              displayName={comp.displayName}
              propTypes={propTypes}
              Component={Component}
              props={comp.lpProps}
              name={comp.name}
              id={`c${i}`}
            >
            </Container>
          </div>
        </li>
      );
    });

    return (
      <StyleRoot>
        <div className="container">
          <PageHeader
            strapline="An LP developer's toolkit for on the go UI"
            heading="Backpack"
            title="Lonely Planet's Pattern Library"
            alignment="center"
            contained
          />

          <ul style={navStyle}>
            {nav}
          </ul>

          <ul>
            {list}
          </ul>
        </div>
      </StyleRoot>
    );
  }
}

const mapStateToProps = (state) => ({
  components: state.styleguide.components,
});

export default connect(mapStateToProps)(Styleguide);
