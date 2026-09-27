import AssetRegistry from "../../../shared/assets/AssetRegistry";
import styles from "./UpgradeCard.module.css";

export default function UpgradeCard({
    upgrade,
    onSelect,
    selected = false,
    delay = 0
}) {
    const isNew = upgrade.status === "new";

    return (
        <div
            className={styles.cardWrapper}
            style={{
                "--delay": `${delay}ms`
            }}
        >
            <button
                type="button"
                className={`${styles.card} ${
                    selected ? styles.selected : ""
                }`}
                onClick={() => onSelect(upgrade)}
            >
                <div className={styles.cardInner}>

                    <div className={styles.header}>

                        <div className={styles.name}>
                            {upgrade.name}
                        </div>

                        <div
                            className={`${styles.level} ${
                                isNew ? styles.new : ""
                            }`}
                        >
                            {isNew
                                ? "NEW"
                                : `LV ${upgrade.level}`}
                        </div>

                    </div>

                    <div className={styles.icon}>
                        <img
                            src={
                                AssetRegistry.Images[
                                    upgrade.texture
                                ]
                            }
                            alt=""
                        />
                    </div>

                    <div className={styles.description}>
                        {upgrade.description}
                    </div>

                </div>
            </button>
        </div>
    );
}