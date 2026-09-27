import styles from "./MenuButton.module.css";

export default function MenuButton({ onClick, onHover, children, disabled = false }) {
    function handleHover(){
        onHover?.();
    }

    return (
        <button 
            className={styles.menuButton} 
            onClick={onClick} 
            onMouseEnter={handleHover}
            disabled={disabled}>
            {children}
        </button>
    );
}