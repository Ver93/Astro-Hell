import styles from "./Experiencebar.module.css";


export default function Experiencebar({
    level,
    progress
}) {
    const blocks = 20;
    const filledBlocks = Math.floor(
        Math.min(progress, 1) * blocks
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>
                    LV.{String(level).padStart(2, "0")}
                </span>

                <span>
                    {Math.floor(progress * 100)}%
                </span>
            </div>

            <div className={styles.track}>
                {
                    Array.from({
                        length: blocks
                    }).map((_, index) => (
                        <div
                            key={index}
                            className={
                                index < filledBlocks
                                ? styles.blockActive
                                : styles.block
                            }
                        />
                    ))
                }
            </div>
        </div>
    );
}