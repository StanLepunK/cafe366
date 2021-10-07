import * as React from "react";
// UTILS
import {
  style_hex_to_filter,
  style_rgb_to_filter,
  num_to_red,
  num_to_green,
  num_to_blue,
} from "../utils/color";
// CAFE 366
import logo_366 from "../../media/logo/cafe366_logo_noir.svg";

function Logo({
  size,
  color,
  red,
  green,
  blue,
  hex,
  translate_x,
  translate_y,
}) {
  // color in filter from hex or rgb
  let style_filter_data = style_hex_to_filter("#000");
  if (typeof hex === "string") {
    style_filter_data = style_hex_to_filter(hex);
  } else if (!isNaN(red) && !isNaN(green) && !isNaN(blue)) {
    style_filter_data = style_rgb_to_filter(red, green, blue);
  } else if (!isNaN(color)) {
    const r = num_to_red(color);
    const g = num_to_green(color);
    const b = num_to_blue(color);
    style_filter_data = style_rgb_to_filter(r, g, b);
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
