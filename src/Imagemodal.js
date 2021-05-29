import React from "react";
import { FaWindowClose, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ImageModal({
  urls: { full },
  closeModal,
  changeImage,
}) {
  return (
    <article className="img-popup">
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal-container">
        <FaArrowLeft
          className="left-arrow"
          onClick={() => {
            changeImage("prev");
          }}
        />
        <div className="icon">
          <FaWindowClose className="close-icon" onClick={closeModal} />
        </div>
        <img className="m-image" src={full}></img>
        <FaArrowRight
          className="right-arrow"
          onClick={() => {
            changeImage("next");
          }}
        />
      </div>
    </article>
  );
}
