import React, { Dimensions } from "react-native";

const base_unit_height = 731;
const base_unit_width = 411;

const { width, height } = Dimensions.get("window");

class NormalizeSize {
  constructor() {
    this.normalizeHeight = this.normalizeHeight.bind(this);
    this.normalizeWidth = this.normalizeWidth.bind(this);
  }

  normalizeHeight(size) {
    return (size / base_unit_height) * height;
  }
  normalizeWidth(size) {
    return (size / base_unit_width) * width;
  }
}

module.exports = new NormalizeSize();
