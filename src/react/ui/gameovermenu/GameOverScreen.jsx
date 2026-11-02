
import { useState } from "react";

import AnimatedStat from "./AnimatedStat";
import MenuButton from "../components/MenuButton";

import styles from "./GameOverScreen.module.css";

export default function GameOverScreen({
    stats,
    sounds,
    onRetry,
    onMenu
}) {
    const statList = [
        { label: "KILLS", value: stats.kills },
        { label: "TREASURES", value: stats.treasures },
        { label: "TOTAL TIME", value: stats.time },
        { label: "MULTIPLIER", value: stats.multiplier },
        { label: "TOTAL SCORE", value: stats.score },
    ].filter(stat => stat.value > 0);

    const [finished, setFinished] = useState([]);
    const activeIndex = finished.length;

    return (
        <div className={styles.overlay}>
            <div className={styles.panel}>
                <h1>RUN COMPLETE</h1>

                {statList.map((stat, index) => {
                    if (index > activeIndex) {
                        return null;
                    }

                    return (
                        <AnimatedStat
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            sounds={sounds}
                            active={index === activeIndex}
                            onComplete={() => {
                                if (index === activeIndex) {
                                    setFinished(prev => [
                                        ...prev,
                                        stat.label
                                    ]);
                                }
                            }}
                        />
                    );
                })}

                {finished.length === statList.length && (
                    <div className={styles.buttons}>
                        <MenuButton onClick={onRetry}>
                            RETRY
                        </MenuButton>

                        <MenuButton onClick={onMenu}>
                            MENU
                        </MenuButton>
                    </div>
                )}
            </div>
        </div>
    );
}

