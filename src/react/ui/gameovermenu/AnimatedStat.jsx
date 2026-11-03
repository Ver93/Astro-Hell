import { useEffect, useState } from "react";
import styles from "./AnimatedStat.module.css";

export default function AnimatedStat({
    label,
    value = 0,
    active = false,
    sounds,
    onComplete
}) {
    const [current, setCurrent] = useState(0);

    const isMultiplier = label === "MULTIPLIER";

    useEffect(() => {
        if (!active) return;

        let cancelled = false;
        let interval = null;
        let frame = null;
        let timer = null;

        const finish = () => {
            if (cancelled) return;
            setCurrent(value);
            onComplete?.();
        };

        if (isMultiplier) {
            setCurrent(value);

            timer = setTimeout(finish, 300);

            return () => {
                cancelled = true;
                clearTimeout(timer);
            };
        }

        if (value <= 10) {
            let count = 0;

            interval = setInterval(() => {
                if (cancelled) return;

                count++;
                setCurrent(count);

                if (sounds?.scoreCount) {
                    sounds.scoreCount.currentTime = 0;
                    sounds.scoreCount.play().catch(() => {});
                }

                if (count >= value) {
                    clearInterval(interval);

                    timer = setTimeout(finish, 100);
                }
            }, 120);
        }
        
        else {
            if (sounds?.scoreCounter) {
                sounds.scoreCounter.currentTime = 0;
                sounds.scoreCounter.play().catch(() => {});
            }

            const start = performance.now();
            const duration = 1000;

            const animate = (time) => {
                if (cancelled) return;

                const progress = Math.min((time - start) / duration, 1);
                setCurrent(Math.floor(value * progress));

                if (progress < 1) {
                    frame = requestAnimationFrame(animate);
                } else {
                    if (sounds?.scoreCounter) {
                        sounds.scoreCounter.pause();
                        sounds.scoreCounter.currentTime = 0;
                    }
                    finish();
                }
            };

            frame = requestAnimationFrame(animate);
        }

        return () => {
            cancelled = true;

            clearInterval(interval);
            if (frame) cancelAnimationFrame(frame);
            if (timer) clearTimeout(timer);

            if (sounds?.scoreCounter) {
                sounds.scoreCounter.pause();
                sounds.scoreCounter.currentTime = 0;
            }
        };
    }, [active, value]);

    const display = isMultiplier
        ? Number(current).toFixed(2)
        : String(Math.floor(current)).padStart(5, "0");

    return (
        <div className={styles.stat}>
            <span className={styles.label}>{label}</span>

            <div className={styles.counter}>
                {display.split("").map((digit, index) => (
                    <span key={index} className={styles.block}>
                        {digit}
                    </span>
                ))}
            </div>
        </div>
    );
}
