// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY
import { navigate } from "gatsby";
// GATSBY SHOPIFY STARTER
import Logo from "./../../icons/logo";
import {
  footer,
  className_copyright,
  identity,
  picto_container,
  link_page,
} from "./footer.module.css";
// APP
// const r = require("./../lib/r_constants_colour"); //
import { get_constants } from "./../../utils/misc";
import { style_num_to_filter } from "./../../utils/color";
import { ButtonPicto, LinkPage } from "./../../components/button/button";

// CAFE 366
import content from "./../../../media/json/content.json";
import { content_by_lang } from "./../../utils/misc";
import picto_facebook from "./../../../media/picto/facebook_2021.svg";
import picto_instagram from "./../../../media/picto/instagram_2016.svg";

// function LinkPage({ className, style, where, children }) {
//   const where_are_you_going = (event) => {
//     event.preventDefault();
//     if (typeof where === "string" || where instanceof String) {
//       if (where === "/back") {
//         navigate(-1);
//       } else {
//         navigate(where);
//       }
//     }
//   };
//   return (
//     <div className={className} style={style} onClick={where_are_you_going}>
//       {children}
//     </div>
//   );
// }

export function Footer() {
  const [legal_info, set_legal_info] = useState(
    content_by_lang(content.info, "legal info", "")
  );
  const [copyright, set_copyright] = useState(
    content_by_lang(content.info, "copyright", "")
  );
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */
  const [r, set_r] = useState(get_constants());

  const style_filter_data = style_num_to_filter(r.LIN);
  const picto_style = {
    position: "relative",
    margin: "auto",
    // vertical displacement depend of the height of the container
    // top: "17%",
    width: "25px",
    height: "25px",

    filter: style_filter_data,
  };

  return (
    <footer className={footer}>
      <div className={identity}>
        <Logo color={r.LIN} />
        <div className={className_copyright}>
          Copyright &copy; {new Date().getFullYear()} · {copyright}
        </div>
      </div>
      <ButtonPicto
        src={picto_facebook}
        stylePicto={picto_style}
        classNameContainer={picto_container}
        alt="facebook"
        href="https://www.facebook.com/Cafe366torrefaction"
      />
      <ButtonPicto
        src={picto_instagram}
        stylePicto={picto_style}
        classNameContainer={picto_container}
        alt="facebook"
        href="https://www.instagram.com/cafe366/"
      />
      <LinkPage className={link_page} where="/legal/legal">
        {legal_info}
      </LinkPage>
    </footer>
  );
}
