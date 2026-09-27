import styles from "./Chest.module.css";

export default function Chest({
    state,
    isOpen,
    onClick,
    onAnimationEnd,
}) {
    return (
        <div
            className={`${styles.treasure} ${styles[state]}`}
            onClick={onClick}
        >
            {!isOpen ? (
                <img
                    src="/assets/images/waiting_treasure_2.png"
                    alt=""
                    onAnimationEnd={onAnimationEnd}
                />
            ) : (
                <>
                    <img
                        className={styles.chest_bottom}
                        src="/assets/images/chest_bottom.png"
                        alt=""
                    />

                    <img
                        className={styles.chest_top}
                        src="/assets/images/chest_top.png"
                        alt=""
                    />
                </>
            )}
        </div>
    );
}