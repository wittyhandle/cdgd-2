import { useState } from "react";

const useModalToggle = () => {
  const [show, setShow] = useState(false);

  const toggleModal = reset => {
    reset();
    setShow(!show);
  };

  return [{ show }, toggleModal];
};

export default useModalToggle;
