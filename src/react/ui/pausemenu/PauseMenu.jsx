import styles from "./PauseMenu.module.css";
import MenuButton from "../components/MenuButton.jsx";

export default function PauseMenu({ onResume, onMainMenu }) {
    return (
        <div className={styles.pauseMenu}>
            <div className={styles.menu}>
                <h1 className={styles.title}>Paused</h1>

                <div className={styles.buttons}>
                    <MenuButton onClick={onResume}>
                        Resume
                    </MenuButton>

                    <MenuButton onClick={onResume}>
                        Options
                    </MenuButton>

                    <MenuButton onClick={onMainMenu}>
                        End Run
                    </MenuButton>
                </div>
            </div>
        </div>
    );
}
