import React, { Component } from "react";

export default class DefaultBar extends Component {
  render() {
    const { value, color = "gray" } = this.props;
    return (
      <div
        style={{
          width: value + "%",
          height: "30px",
          backgroundColor: color,
          boxShadow: "2px 2px #3333",
        }}
      />
    );
  }
}
