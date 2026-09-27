import { useState } from "react";
import UpgradeIntro from "./anim/UpgradeIntro";
import UpgradeScreen from "./UpgradeScreen";
import styles from "./UpgradeMenu.module.css";

export default function UpgradeMenu({ upgrades, gameRef }) {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <div className={styles.menu}>
            {!introComplete ? (
                <UpgradeIntro
                    onComplete={() => setIntroComplete(true)}
                />
            ) : (
                <UpgradeScreen
                    upgrades={upgrades}
                    gameRef={gameRef}
                />
            )}
        </div>
    );
}