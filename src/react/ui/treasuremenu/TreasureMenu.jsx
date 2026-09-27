import { useState } from "react";
import TreasureChest from "./treasurechest/TreasureChest";
import styles from "./TreasureMenu.module.css";
import MenuButton from "../components/MenuButton";
import TreasureSpotlights from "./TreasureSpotlights";
import UpgradeIntro from "../upgrademenu/anim/UpgradeIntro";

export default function TreasureMenu({ treasures, onContinue }) {

    const [introDone, setIntroDone] = useState(false);
    
    const [openedChests, setOpenedChests] = useState(0);

    const handleRewardRevealed = () => {
        setOpenedChests((count) => count + 1);
    };

    return (
        <>
            <TreasureSpotlights />
            <UpgradeIntro
                text="TREASURE FOUND!"
                onComplete={() => setIntroDone(true)}
            />

            {introDone && (
                <>

                    <div className={styles.menu}>
                        <TreasureChest
                            index={0}
                            treasure={treasures[0]}
                            onRewardRevealed={handleRewardRevealed}
                        />

                        <TreasureChest
                            index={1}
                            treasure={treasures[1]}
                            onRewardRevealed={handleRewardRevealed}
                        />

                        <TreasureChest
                            index={2}
                            treasure={treasures[2]}
                            onRewardRevealed={handleRewardRevealed}
                        />
                    </div>

                    {openedChests === 3 && (
                        <div className={styles.continueButton}>
                            <MenuButton onClick={onContinue}>
                                Continue
                            </MenuButton>
                        </div>
                    )}
                </>
            )}
        </>
    );

}