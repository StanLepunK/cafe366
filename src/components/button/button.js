// REACT
import * as React from "react";
// gatsby
import { Link } from "gatsby";
import { navigate } from "gatsby";
// app
import { more_button } from "./button.module.css";

export function ButtonPicto({
  src,
  classNamePicto,
  stylePicto,
  classNameContainer,
  styleContainer,
  alt,
  href,
}) {
  return (
    <div className={classNameContainer} style={styleContainer}>
      <div className={classNamePicto} style={stylePicto}>
        <a href={href} target="_blank" rel="noreferrer">
          <img src={src} alt={alt} />
        </a>
      </div>
    </div>
  );
}

export function MoreButton({ className, ...props }) {
  return <Link className={[className, more_button].join(" ")} {...props} />;
}

export function LinkPage({ className, style, where, children }) {
  const where_are_you_going = (event) => {
    event.preventDefault();
    if (typeof where === "string" || where instanceof String) {
      if (where === "/back") {
        navigate(-1);
      } else {
        navigate(where);
      }
    }
  };
  return (
    <div className={className} style={style} onClick={where_are_you_going}>
      {children}
    </div>
  );
}
