import React, { useRef } from "react";
import { EggFirst } from "./../../icons";

function InfoModal({ setShowModal }) {
  const modalRef = useRef();
  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };
  return <EggFirst></EggFirst>;
}

export default InfoModal;
