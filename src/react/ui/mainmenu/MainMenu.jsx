import styles from "./MainMenu.module.css";
import MenuButton from "../components/MenuButton.jsx";

export default function MainMenu({ onStartGame, onOptions }) {
    return (
        <div className={styles.mainMenu}>
            <h1 className={styles.title}>Astro</h1>
            <MenuButton onClick={onStartGame}>Start</MenuButton>
            <MenuButton onClick={onOptions}>Options</MenuButton>
        </div>
    );
}