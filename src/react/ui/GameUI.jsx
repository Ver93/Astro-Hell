import { useEffect, useRef, useState } from "react";

import TreasureMenu from "./treasuremenu/TreasureMenu.jsx";
import UpgradeMenu from "./upgrademenu/UpgradeMenu.jsx";
import HUD from "./hud/HUD.jsx";
import PauseMenu from "./pausemenu/PauseMenu.jsx";
import MainMenu from "./mainmenu/MainMenu.jsx";

const TREASURE_ASSETS = [
    `${import.meta.env.BASE_URL}assets/images/waiting_treasure_2.png`,
    `${import.meta.env.BASE_URL}assets/images/chest_bottom.png`,
    `${import.meta.env.BASE_URL}assets/images/chest_top.png`,
    `${import.meta.env.BASE_URL}assets/images/items_row.png`,
];

function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = resolve;
        image.onerror = reject;

        image.src = src;
    });
}

function preloadTreasureAssets() {
    return Promise.all(
        TREASURE_ASSETS.map(preloadImage)
    );
}

export default function GameUI({ gameRef }) {

    const [showMainMenu, setShowMainMenu]   = useState(true);
    const [showTreasureMenu, setShowTreasureMenu] = useState(false);
    const [showUpgradeMenu, setShowUpgradeMenu] = useState(false);
    const [showPauseMenu, setShowPauseMenu] = useState(false);
    const [showScoreMenu, setShowScoreMenu] = useState(false);
    const [showHUD, setShowHUD] = useState(false);

    const [upgrades, setUpgrades] = useState([]);
    const [treasures, setTreasures] = useState([]);

    const [hudData, setHudData] = useState({
        level: 1,
        progress: 0,
        currentWeapons: [],
    });

    const [gameOverData, setGameOverData] = useState({});

    const treasureReady = useRef(false);
    const pendingTreasure = useRef(null);

    useEffect(() => {

        preloadTreasureAssets()
            .then(() => {

                treasureReady.current = true;

                if (pendingTreasure.current) {
                    setTreasures(pendingTreasure.current);
                    pendingTreasure.current = null;
                    setShowTreasureMenu(true);
                }
            })
            .catch((error) => {

                console.error(
                    "Failed to preload treasure assets:",
                    error
                );
            });

    }, []);

    useEffect(() => {

        if (!gameRef.current) {
            return;
        }

        const events = gameRef.current.events;

        const openTreasure = (treasures) => {
            if (!Array.isArray(treasures) || treasures.length < 3) {
                return;
            }

            if (treasureReady.current) {
                console.log(treasures);
                setTreasures(treasures);
                setShowTreasureMenu(true);
            } else {
                pendingTreasure.current = treasures;
            }
        };

        const mainMenu = () => {
            closeMenus();
            setShowMainMenu(true);
        };

        const openUpgrade = (upgrades) => {
            setUpgrades(upgrades);
            setShowUpgradeMenu(true);
        };

        const handleShowHUD = () => {
            setShowHUD(true);
        };

        const updateHUD = (data) => {
            setHudData(data);
        };

        const selectUpgrade = (upgrade) => {
            closeMenus();
            setShowHUD(true);
        };

        const selectTreasure = (treasures) => {
            setShowTreasureMenu(false);
            setShowHUD(true);
        };

        const pauseGame = () => {
            closeMenus();
            setShowPauseMenu(true);
        };

        const resumeGame = () => {
            closeMenus();
            setShowHUD(true);
        };

        events.on("openTreasure", openTreasure);
        events.on("openUpgrade", openUpgrade);
        events.on("showHUD", handleShowHUD);
        events.on("updateHUD", updateHUD);
        events.on("selectUpgrade", selectUpgrade);
        events.on("selectTreasure", selectTreasure);
        events.on("pauseGame", pauseGame);
        events.on("mainMenu", mainMenu);
        events.on("resumeGame", resumeGame);

        return () => {

            events.off("openTreasure", openTreasure);
            events.off("openUpgrade", openUpgrade);
            events.off("showHUD", handleShowHUD);
            events.off("updateHUD", updateHUD);
            events.off("selectUpgrade", selectUpgrade);
            events.off("selectTreasure", selectTreasure);
            events.off("pauseGame", pauseGame);
            events.off("mainMenu", mainMenu);
            events.off("resumeGame", resumeGame);
        };

    }, [gameRef]);

    const handleContinue = () => {

        setShowTreasureMenu(false);
        setShowHUD(true);

        gameRef.current.events.emit(
            "selectTreasure",
            treasures
        );
    };

    const handleResumeGame = () => {
        closeMenus();
        setShowHUD(true);
        gameRef.current.events.emit(
            "resumeGame"
        );
    }

    const closeMenus = () => {
        setShowMainMenu(false)
        setShowHUD(false);
        setShowPauseMenu(false);
        setShowTreasureMenu(false);
        setShowUpgradeMenu(false);
    };

    const handleStartGame = () => {
        closeMenus();
        setShowHUD(true);
        gameRef.current.events.emit(
            "startGame"
        );
    }

    return (
        <>
            {showMainMenu && (
                <MainMenu
                onStartGame={handleStartGame}
                />
            )}

            {showHUD && (
                <HUD
                    data={hudData}
                />
            )}

            {showUpgradeMenu && (
                <UpgradeMenu
                    upgrades={upgrades}
                    gameRef={gameRef}
                />
            )}

            {showTreasureMenu && (
                <TreasureMenu
                    treasures={treasures}
                    onContinue={handleContinue}
                />
            )}

            {showPauseMenu && (
                <PauseMenu
                    onResume={handleResumeGame}
                />
            )}

            {/* {showGameOverScreen && (
                <PauseMenu
                    onResume={handleResumeGame}
                />
            )} */}

        </>
    );
}
