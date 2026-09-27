import { useState } from "react";
import Chest from "./Chest";
import OpeningSplash from "./OpeningSplash";
import ItemStream from "./ItemStream";
import Reward from "./Reward";
import styles from "./TreasureChest.module.css";

export default function TreasureChest({
    index,
    treasure,
    onRewardRevealed,
}) {

    const [state, setState] = useState("idle");

    const handleClick = () => {
        if (state !== "idle") return;

        setState("opening");
    };

    const handleChestAnimationEnd = (event) => {
        if (event.target !== event.currentTarget) return;
        if (state !== "opening") return;

        setState("opened");

        setTimeout(() => {
            setState("streamExit");
        }, 1200);
    };

    const handleStreamAnimationEnd = (event) => {
        if (event.target !== event.currentTarget) return;
        if (state !== "streamExit") return;

        setState("revealing");
    };

    const handleRewardAnimationEnd = (event) => {
        if (event.target !== event.currentTarget) return;
        if (state !== "revealing") return;

        setState("revealed");

        if (onRewardRevealed) {
            onRewardRevealed();
        }
    };

    const chestIsOpen =
        state === "opened" ||
        state === "streamExit" ||
        state === "revealing" ||
        state === "revealed";

    return (
        <div
            className={`
                ${styles.treasureContainer}
                ${styles[`treasure${index + 1}`]}
            `}
        >
            <Chest
                state={state}
                isOpen={chestIsOpen}
                onClick={handleClick}
                onAnimationEnd={handleChestAnimationEnd}
            />

            {state === "opening" && (
                <OpeningSplash />
            )}

            {chestIsOpen && (
                <div className={styles.yellowBanner} />
            )}

            {(state === "opened" || state === "streamExit") && (
                <ItemStream
                    index={index}
                    exiting={state === "streamExit"}
                    onAnimationEnd={handleStreamAnimationEnd}
                />
            )}

            {(state === "revealing" || state === "revealed") && (
                <Reward
                    treasure={treasure}
                    revealed={state === "revealed"}
                    onAnimationEnd={handleRewardAnimationEnd}
                />
            )}
        </div>
    );
}