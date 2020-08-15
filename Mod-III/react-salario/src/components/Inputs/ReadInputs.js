import React, { Component } from "react";

export default class ReadInputs extends Component {
  render() {
    const { label, value } = this.props;

    return (
      <div>
        <label>
          {label}:
          <input type="text" readOnly disabled value={value} />
        </label>
      </div>
    );
  }
}
