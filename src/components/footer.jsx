import * as React from "react";
// APP TEMPLATE
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
// APP CUSTOM
import content from "../../media/json/content.json";
import { get_lang, find_lang } from "../utils/misc";

export function Footer() {
  // replace the lines below by hooks useState
  let legal_info = "";
  let copyright = "";

  if (get_lang() === "fr") {
    legal_info = find_lang(content.info, "legal info", "fr");
  } else {
    legal_info = find_lang(content.info, "legal info", "en");
  }

  if (get_lang() === "fr") {
    copyright = find_lang(content.info, "copyright", "fr");
  } else {
    copyright = find_lang(content.info, "copyright", "en");
  }

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
