import styles from "./UpgradeScreen.module.css";
import UpgradeCard from "./UpgradeCard";

export default function UpgradeScreen({ upgrades, gameRef }) {
    const handleSelect = (upgrade) => {
        gameRef.current.events.emit(
            "selectUpgrade",
            upgrade
        );
    };

    return (
        <div className={styles.screen}>
            <div className={styles.frame}>

                <div className={styles.title}>
                    CHOOSE YOUR UPGRADE
                </div>

                <div className={styles.upgrades}>
                    {upgrades.map((upgrade, index) => (
                        <UpgradeCard
                            key={upgrade.id}
                            upgrade={upgrade}
                            onSelect={handleSelect}
                            delay={index * 90}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}
