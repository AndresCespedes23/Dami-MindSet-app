import React from "react";
import styles from "./modal.module.css";
import Button from "../Button";

function Modal({ handleShowModal }) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Button type="close" valor="close" handleShowModal={handleShowModal} />
        </div>
        <div className={styles.title}>
          <h1>Example text</h1>
        </div>
        <div className={styles.body}>
        </div>
        <div className={styles.footer}>
          <button >
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;