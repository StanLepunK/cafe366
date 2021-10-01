// REACT
import React from "react";
import { useState } from "react";
// OTHER
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { navStyle, navLink, activeLink } from "./menu.module.css";

function LinkCollection({ handle, title }) {
  return (
    <div>
      <Link
        key={handle}
        className={navLink}
        to={`/collection/${slugify(handle)}`}
        activeClassName={activeLink}
      >
        {title}
      </Link>
    </div>
  );
}

function build_list(nodes) {
  let list = [];
  let buf = [];
  if (nodes === undefined) {
    return null;
  }
  console.log("nodes:", nodes);
  // step one add all elements
  nodes.map((elem) => {
    for (let i = 0; i < elem.collections.length; i++) {
      const obj = {
        handle: elem.collections[i].handle,
        title: elem.collections[i].title,
      };
      buf.push(obj);
    }
  });
  // build finale list
  for (let i = 0; i < buf.length; i++) {
    let obj_temp = buf[i];

    if (list.length === 0) {
      list.push(obj_temp);
    } else {
      let add_is = true;
      for (let k = 0; k < list.length; k++) {
        if (obj_temp.handle === list[k].handle) {
          add_is = false;
          break;
        }
      }
      if (add_is) {
        list.push(obj_temp);
      }
    }
  }
  console.log("list:", list);
  return list;
}

export default function MenuCollections({ className }) {
  const all = useStaticQuery(
    graphql`
      query {
        allShopifyProduct {
          nodes {
            collections {
              title
              handle
            }
          }
        }
      }
    `
  );

  const [elems, set_elems] = useState(build_list(all.allShopifyProduct.nodes));

  // console.log("all", all);
  // console.log("all.allShopifyProduct", all.allShopifyProduct);
  // console.log("all.allShopifyProduct.nodes", all.allShopifyProduct.nodes);

  return (
    <div className={[navStyle, className].join(" ")}>
      {elems.map((elem) => {
        if (elem.handle !== "frontpage") {
          // console.log("elem.collections", elem.collections);
          // console.log("elem.collections.handle", elem.collections[0].handle);

          // return <div>{elem.collections[0].handle} </div>;
          return <LinkCollection handle={elem.handle} title={elem.title} />;
        }
      })}
      {/* {collec.map((elem) => {
        if (elem !== "frontpage") {
          return <LinkCollection handle={elem} />;
        }
      })} */}
    </div>
  );
}

// export default function MenuCollections({ className }) {
//   const {
//     allShopifyProduct: { collec, test },
//   } = useStaticQuery(graphql`
//     query {
//       allShopifyProduct {
//         collec: distinct(field: collections___handle)
//         test: nodes {
//           collections {
//             title
//             handle
//           }
//         }
//       }
//     }
//   `);

//   return (
//       {collec.map((elem) => {
//         if (elem !== "frontpage") {
//           return <LinkCollection handle={elem} />;
//         }
//       })}
//     </div>
//   );
// }
