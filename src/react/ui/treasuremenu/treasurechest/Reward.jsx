import { useState } from "react";
import RewardGlitter from "./RewardGlitter";
import RewardSplash from "./RewardSplash";
import AssetRegistry from "../../../../shared/assets/AssetRegistry";
import styles from "./Reward.module.css";

export default function Reward({
    revealed,
    treasure,
    onAnimationEnd,
}) {

    // console.log("TREASURE", treasure);

    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        if (!revealed) return;
        if (selected) return;

        setSelected(true);
    };

    return (
        <div
            className={`
                ${styles.rewardReveal}
                ${revealed ? styles.rewardChoice : ""}
                ${selected ? styles.rewardSelected : ""}
            `}
            onAnimationEnd={onAnimationEnd}
            onClick={handleClick}
        >
            <div className={styles.reward}>
                <img
                    src={
                        AssetRegistry.Images[
                            treasure.texture
                        ]
                    }
                    alt=""
                />
            </div>

            {revealed && (
                <RewardGlitter />
            )}

            {selected && (
                <RewardSplash />
            )}
        </div>
    );
}