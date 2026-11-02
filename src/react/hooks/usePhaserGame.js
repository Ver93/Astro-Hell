import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import MainScene from "../../phaser/MainScene";

export default function usePhaserGame(width, height) {
    const gameRef = useRef(null);
    const canvasRef = useRef(null);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (gameRef.current) return;

        const game_config = new Phaser.Game({
            type: Phaser.AUTO,
            width: width,
            height: height,
            parent: canvasRef.current,

            pixelArt: true,

            input: {
                keyboard: true,
                mouse: true,
            },

            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width,
                height,
            },

            disableVisibilityChange: true,

            scene: [MainScene],
        });

        gameRef.current = game_config;

        const handlePhaserCreated = () => {
            console.log("Phaser: created");

            setReady(true);
        };

        game_config.events.on(
            "phaserCreated",
            handlePhaserCreated
        );

        return () => {
            game_config.events.off(
                "phaserCreated",
                handlePhaserCreated
            );

            game_config.destroy(true);

            gameRef.current = null;
            setReady(false);
        };
    }, []);

    return {
        gameRef,
        canvasRef,
        ready,
    };
}