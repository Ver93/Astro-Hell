import Experiencebar from "./Experiencebar";
import Slot from "./Slot";
import KillCounter from "./KillCounter";
import styles from "./HUD.module.css";

export default function HUD({ data = {} }) {
    const weapons = data.currentWeapons ?? [];
    const passives = data.currentPassives ?? [];

    
    return (
        <div className={styles.hud}>

            <div className={styles.topHud}>

                <Experiencebar
                    level={data.level}
                    progress={data.progress}
                />

                <div className={styles.icons}>
                    <div className={styles.weapons}>
                        {[0, 1, 2, 3, 4].map((index) => (
                            <Slot
                                key={`weapon-${index}`}
                                item={weapons[index]}
                            />
                        ))}
                    </div>

                    <div className={styles.passives}>
                        {[0, 1, 2, 3, 4].map((index) => (
                            <Slot
                                key={`passive-${index}`}
                                item={passives[index]}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <KillCounter kills={data.kills} />

        </div>
    );
}
