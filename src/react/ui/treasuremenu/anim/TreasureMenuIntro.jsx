import { motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./TreasureMenuIntro.module.css";

export default function TreasureMenuIntro({ onComplete }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, 1600);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className={styles.intro}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
        >
            <motion.h1
                className={styles.title}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                Treasure Found!
            </motion.h1>
        </motion.div>
    );
}
