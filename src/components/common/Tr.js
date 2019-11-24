import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";

const Tr = ({ flairCss, css, children }) => {
  const [flair, setFlair] = useState("");

  useEffect(() => {
    setFlair(flairCss || "");
    setTimeout(() => {
      setFlair("");
    }, 2000);
  }, [flairCss]);

  return <tr className={`${css} ${flair}`}>{children}</tr>;
};

Tr.propTypes = {
  flairCss: PropTypes.string,
  css: PropTypes.string,
  children: PropTypes.node.isRequired
};

Tr.defaultProps = {
  css: "",
  flairCss: ""
};

export default Tr;
