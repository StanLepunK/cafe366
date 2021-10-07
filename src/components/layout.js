import * as React from "react";
import { SkipNavContent, SkipNavLink } from "./skip_nav";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Seo } from "./seo";

// const r = require("./../lib/r_constants_colour");

export function Layout({ children }) {
  return (
    <div>
      <Seo />
      {/* A quoi sert SkipNavLink ????? */}
      {/* <SkipNavLink /> */}
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  );
}
