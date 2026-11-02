
import { useRef, useState } from "react";
import "./TouchControls.css";

export default function TouchControls({ gameRef }) {
    const joystickRef = useRef(null);
    const pointerRef = useRef(null);
    const originRef = useRef({ x: 0, y: 0 });

    const [stick, setStick] = useState({ x: 0, y: 0 });
    const [boosting, setBoosting] = useState(false);

    const getInputSystem = () => {
        return gameRef.current
            ?.scene
            ?.keys
            ?.main
            ?.gameInstance
            ?.systems
            ?.inputSystem;
    };

    const updateJoystick = (event) => {
        if (pointerRef.current !== event.pointerId) return;

        const dx = event.clientX - originRef.current.x;
        const dy = event.clientY - originRef.current.y;

        const distance = Math.hypot(dx, dy);
        const maxDistance = 45;
        const strength = Math.min(distance / maxDistance, 1);

        const x = distance === 0 ? 0 : (dx / distance) * strength;
        const y = distance === 0 ? 0 : (dy / distance) * strength;

        setStick({
            x: x * maxDistance,
            y: y * maxDistance
        });

        getInputSystem()?.setTouchMovement(x, -y);
    };

    const handleJoystickDown = (event) => {
        event.preventDefault();

        pointerRef.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);

        const rect = joystickRef.current.getBoundingClientRect();

        originRef.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        updateJoystick(event);
    };

    const handleJoystickUp = (event) => {
        if (pointerRef.current !== event.pointerId) return;

        pointerRef.current = null;

        setStick({ x: 0, y: 0 });
        getInputSystem()?.setTouchMovement(0, 0);
    };

    const handleBoostDown = (event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);

        setBoosting(true);
        getInputSystem()?.setTouchBoost(true);
    };

    const handleBoostUp = () => {
        setBoosting(false);
        getInputSystem()?.setTouchBoost(false);
    };

    return (
        <div className="touch-controls">
            <div
                ref={joystickRef}
                className="touch-joystick"
                onPointerDown={handleJoystickDown}
                onPointerMove={updateJoystick}
                onPointerUp={handleJoystickUp}
                onPointerCancel={handleJoystickUp}
            >
                <div
                    className="touch-joystick-knob"
                    style={{
                        transform: `translate(${stick.x}px, ${stick.y}px)`
                    }}
                />
            </div>

            <button
                className={`touch-boost ${boosting ? "active" : ""}`}
                onPointerDown={handleBoostDown}
                onPointerUp={handleBoostUp}
                onPointerCancel={handleBoostUp}
                onLostPointerCapture={handleBoostUp}
            >
                BOOST
            </button>
        </div>
    );
}
