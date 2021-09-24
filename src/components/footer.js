// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY

// GATSBY SHOPIFY STARTER
import Logo from "../icons/logo";
import {
  footerStyle,
  copyright,
  links,
  blurb,
  logos,
  footerNavList,
  footerNavListItem,
} from "./footer.module.css";
// CAFE 366
import content from "../../media/json/content.json";
import { content_by_lang } from "../utils/misc";

export function Footer() {
  const [legal_info, set_legal_info] = useState(
    content_by_lang(content.info, "legal info", "")
  );
  const [copyright, set_copyright] = useState(
    content_by_lang(content.info, "copyright", "")
  );

  return (
    <footer className={footerStyle}>
      <div className={blurb}>
        <div className={logos}>
          <Logo />
        </div>
        <strong>{legal_info}</strong>
        {/* <code>src/components/footer.jsx</code> */}
      </div>
      <div className={copyright}>
        Copyright &copy; {new Date().getFullYear()} · {copyright}
      </div>
    </footer>
  );
}
