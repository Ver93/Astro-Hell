import styles from "./ItemStream.module.css";

export default function ItemStream({
    index,
    exiting,
    onAnimationEnd,
}) {
    return (
        <div
            className={`${styles.itemStream} ${
                exiting ? styles.exit : ""
            }`}
            onAnimationEnd={onAnimationEnd}
        >
            <div
                className={styles.itemTrack}
                style={{
                    "--start-frame": index * 5,
                }}
            >
                {[...Array(30)].map((_, i) => {
                    const frame = (i + index * 5) % 15;

                    return (
                        <div
                            key={i}
                            className={styles.itemFrame}
                            style={{
                                backgroundPosition:
                                    `-${frame * 32}px 0`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}