import styles from "./Slot.module.css";
import AssetRegistry from "../../../shared/assets/AssetRegistry";
import UpgradeDefinitions from "../../../shared/data/upgrade/UpgradeDefinitions";

export default function Slot({ item }) {
    if (!item) {
        return <div className={styles.slot} />;
    }
    // console.log(item);
    const definition = UpgradeDefinitions[item.id];
    const texture = definition?.texture;
    const image = texture ? AssetRegistry.Images[texture] : null;

    return (
        <div className={styles.slot}>
            {image && (
                <img
                    className={styles.weaponImage}
                    src={image}
                    alt=""
                />
            )}

            <span className={styles.level}>
                {item.level}
            </span>
        </div>
    );
}
