import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spinner = () => {
  const [show, setShow] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(" show");
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <FontAwesomeIcon className={`loader ${show}`} icon="spinner" spin />;
};

export default Spinner;
