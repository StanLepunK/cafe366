import * as React from "react"
// gatsby
import { Link } from "gatsby"
// app
import { moreButton } from "./more_button.module.css"

export function MoreButton({ className, ...props }) {
  return <Link className={[className, moreButton].join(" ")} {...props} />
}
