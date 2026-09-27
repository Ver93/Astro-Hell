import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./UpgradeIntro.module.css";

export default function UpgradeIntro({ text = "LEVEL UP!", onComplete }) {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setExit(true), 1600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className={styles.intro}
            animate={
                exit
                    ? { opacity: 0, scale: 1.15 }
                    : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => exit && onComplete?.()}
        >
            <div className={styles.flash} />

            <div className={styles.impact}>
                <div className={styles.core} />
                <div className={styles.wave} />
                <div className={styles.wave2} />
            </div>

            <motion.h1
                className={styles.title}
                initial={{
                    scale: 0,
                    y: 80,
                    rotate: -10,
                    opacity: 0
                }}
                animate={{
                    scale: [0, 1.35, 0.95, 1],
                    y: [80, -15, 0, 0],
                    rotate: [-10, 5, 0],
                    opacity: 1
                }}
                transition={{
                    duration: 1,
                    ease: "backOut"
                }}
            >
                {text}
            </motion.h1>
        </motion.div>
    );
}
