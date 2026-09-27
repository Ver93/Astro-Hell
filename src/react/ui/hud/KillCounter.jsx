import styles from "./KillCounter.module.css";

export default function KillCounter({ kills = 0 }) {
    return (
        <div className={styles.counter}>
            <span className={styles.label}>KILLS</span>
            <span className={styles.value}>{kills}</span>
        </div>
    );
}