import styles from "./Canvas.module.css";

export default function Canvas({ canvasRef, onClick }) {
    return (
        <div
            className={styles.canvasWrapper}
            ref={canvasRef}
            onClick={onClick}
        />
    );
}
