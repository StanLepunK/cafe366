import * as React from "react";
// UTILS
import { style_hex_to_filter, style_rgb_to_filter } from "../utils/color";
// CAFE 366
import logo_366 from "../../media/logo/cafe366_logo_noir.svg";

function Logo({ size, red, green, blue, hex, translate_x, translate_y }) {
  // color in filter from hex or rgb
  let style_filter_data = style_hex_to_filter("#000");
  if (typeof hex === "string") {
    style_filter_data = style_hex_to_filter(hex);
  } else if (!isNaN(red) && !isNaN(green) && !isNaN(blue)) {
    style_filter_data = style_rgb_to_filter(red, green, blue);
  }

  // size in px
  let width = "30px";
  if (size !== undefined) {
    width = size;
  }

  // translation in %
  let tx = 0;
  if (!isNaN(translate_x)) {
    tx = translate_x;
  }
  let ty = 0;
  if (!isNaN(translate_y)) {
    ty = translate_y;
  }
  const translate = "translate(" + tx + "%, " + ty + "%)";

  const logo_style = {
    width: width,
    transform: translate,
    filter: style_filter_data,
  };

  return (
    <div style={logo_style}>
      <img src={logo_366} alt="café 366" />
    </div>
  );
}

export default Logo;
