"use client";
import { useEffect } from "react";
import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose?: (() => void) | null;
};

const Modal = ({ children, onClose = null }: Props) => {
  const close = () => {
    if (onClose !== null) {
      onClose();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (onClose != null && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        {onClose != null && (
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={close}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
