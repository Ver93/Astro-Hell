import styles from "./Game.module.css";
import Canvas from "./canvas/Canvas.jsx";
import CRT from "./effects/CRT.jsx";
import GameUI from "./ui/GameUI.jsx";

import usePhaserGame from "./hooks/usePhaserGame.js";

export default function Game() {
    const {
        canvasRef,
        gameRef,
        ready,
    } = usePhaserGame(1920, 1080);

    return (
        <div className={styles.gameContainer}>
            <Canvas canvasRef={canvasRef} />

            <div className={styles.uiLayer}>
                {ready && (
                    <GameUI gameRef={gameRef} />
                )}
            </div>
            <CRT />
        </div>
    );
}