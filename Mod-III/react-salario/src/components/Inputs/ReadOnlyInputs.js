import React, { Component } from "react";

export default class ReadOnlyInputs extends Component {
  render() {
    const { label, value, color } = this.props;
    return (
      <div>
        <label>
          {label}:
          <input
            type="text"
            readOnly
            disabled
            value={value}
            style={{ color: color }}
          />
        </label>
      </div>
    );
  }
}
