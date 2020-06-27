import React, { Component } from "react";
class UniversityBoxItem extends Component {
  state = {};

  onPress = (id) => {
    this.props.onUniversityButtonPressed(id);
  };

  render() {
    const { item } = this.props;

    return (
      <button
        className="universityBoxDiv"
        onClick={() => this.onPress(item._id)}
      >
        <h3 className="universityNameBox">{item.name}</h3>
      </button>
    );
  }
}

export default UniversityBoxItem;
