
export default class AudioManager {

    constructor(game) {
        this.scene = game.scene;

        this.sounds = {};
        this.loops = {};

        this.currentMusic = null;
        this.previousMusic = null;

        this.masterVolume = 1;
        this.musicVolume = 1;
        this.sfxVolume = 1;

        this.initialized = false;

        /*
         * SFX LIMIT
         */
        this.activeSfx = {};
        this.sfxLimits = {};
        this.defaultMaxVoices = 10;
        this.defaultCooldown = 0.01;

        this.lastPlayed = {};
    }

    initialize() {
        if (!this.scene.sound) {
            console.warn(
                "AudioManager: Phaser sound not ready"
            );

            return;
        }

        this.initialized = true;
    }

    /*
     * --------------------------------------------------
     * SOUNDS
     * --------------------------------------------------
     */

    addSound(key, volume = 1) {
        const sound =
            this.scene.sound.add(key, {
                loop: false,
                volume: this._mixVolume(
                    "sfx",
                    volume
                )
            });

        sound.baseVolume = volume;

        this.sounds[key] = sound;
    }

    addLoop(key, volume = 1) {
        const sound =
            this.scene.sound.add(key, {
                loop: true,
                volume: this._mixVolume(
                    "sfx",
                    volume
                )
            });

        sound.baseVolume = volume;

        this.loops[key] = sound;
    }

    /*
     * --------------------------------------------------
     * SFX LIMIT
     * --------------------------------------------------
     */

    setSfxLimit(
        key,
        maxVoices = 3,
        cooldown = 0.025
    ) {
        this.sfxLimits[key] = {
            maxVoices,
            cooldown
        };
    }

    _getSfxLimit(key) {
        return (
            this.sfxLimits[key] || {
                maxVoices:
                    this.defaultMaxVoices,

                cooldown:
                    this.defaultCooldown
            }
        );
    }

    _canPlaySfx(key) {
        const limit =
            this._getSfxLimit(key);

        const now =
            this.scene.time.now;

        const last =
            this.lastPlayed[key] ??
            -Infinity;

        if (
            now - last <
            limit.cooldown * 1000
        ) {
            return false;
        }

        const voices =
            this.activeSfx[key];

        if (
            voices &&
            voices.size >=
            limit.maxVoices
        ) {
            return false;
        }

        return true;
    }

    /*
     * --------------------------------------------------
     * VOLUME
     * --------------------------------------------------
     */

    _mixVolume(type, volume = 1) {
        if (type === "music") {
            return (
                volume *
                this.musicVolume *
                this.masterVolume
            );
        }

        return (
            volume *
            this.sfxVolume *
            this.masterVolume
        );
    }

    /*
     * --------------------------------------------------
     * PLAY SFX
     * --------------------------------------------------
     */

    play(key, config = {}) {
        if (!this.scene.sound) {
            return;
        }

        if (!this._canPlaySfx(key)) {
            return;
        }

        const baseVolume =
            config.volume ??
            this.sounds[key]?.baseVolume ??
            1;

        if (!this.activeSfx[key]) {
            this.activeSfx[key] =
                new Set();
        }

        const voices =
            this.activeSfx[key];

        const sound =
            this.scene.sound.add(key, {
                ...config,

                volume: this._mixVolume(
                    "sfx",
                    baseVolume
                )
            });

        sound.baseVolume =
            baseVolume;

        voices.add(sound);

        this.lastPlayed[key] =
            this.scene.time.now;

        sound.play();

        sound.once(
            "complete",
            () => {
                voices.delete(sound);

                sound.destroy();

                if (
                    voices.size === 0
                ) {
                    delete this.activeSfx[key];
                }
            }
        );
    }

    /*
     * --------------------------------------------------
     * LOOPS
     * --------------------------------------------------
     */

    playLoop(key, config = {}) {
        const sound =
            this.loops[key];

        if (!sound) {
            console.warn(
                "Loop sound not found:",
                key
            );

            return;
        }

        if (sound.isPlaying) {
            return;
        }

        sound.baseVolume =
            config.volume ??
            sound.baseVolume ??
            1;

        sound.play({
            loop: true,
            ...config,

            volume: this._mixVolume(
                "sfx",
                sound.baseVolume
            )
        });
    }

    stop(key) {
        const sound =
            this.loops[key];

        if (sound?.isPlaying) {
            sound.stop();
        }
    }

    /*
     * --------------------------------------------------
     * MUSIC
     * --------------------------------------------------
     */

    playMusic(key, config = {}) {
        const music =
            this.sounds[key];

        if (!music) {
            console.warn(
                "Music not found:",
                key
            );

            return;
        }

        /*
         * Om samma musik redan är aktiv,
         * gör ingenting.
         */
        if (
            this.currentMusic === music &&
            music.isPlaying
        ) {
            return;
        }

        /*
         * Spara nuvarande musik.
         *
         * Viktigt:
         * Vi PAUSAR den istället för stop().
         * Därmed behålls playback-positionen.
         */
        if (
            this.currentMusic &&
            this.currentMusic !== music
        ) {
            this.previousMusic =
                this.currentMusic;

            this.currentMusic.pause();
        }

        this.currentMusic =
            music;

        const baseVolume =
            config.volume ??
            music.baseVolume ??
            1;

        music.baseVolume =
            baseVolume;

        /*
         * Om musiken tidigare varit pausad
         * ska den resume:a istället för att
         * börja från början.
         */
        if (music.isPaused) {
            music.resume();
        } else {
            music.play({
                loop: true,
                ...config,

                volume: this._mixVolume(
                    "music",
                    baseVolume
                )
            });
        }

        /*
         * Säkerställ rätt volym efter resume.
         */
        music.setVolume(
            this._mixVolume(
                "music",
                baseVolume
            )
        );
    }

    /*
     * Pausa aktuell musik.
     */
    pauseMusic() {
        if (!this.currentMusic) {
            return;
        }

        this.currentMusic.pause();
    }

    /*
     * Resume:a aktuell musik.
     *
     * Börjar där den pausades.
     */
    resumeMusic() {
        if (!this.currentMusic) {
            return;
        }

        this.currentMusic.resume();
    }

    /*
     * Resume:a musiken som var aktiv
     * innan exempelvis PAUSE/UPGRADE.
     */
    resumePreviousMusic() {
        if (!this.previousMusic) {
            return;
        }

        /*
         * Stoppa state-musiken.
         */
        if (
            this.currentMusic &&
            this.currentMusic !==
            this.previousMusic
        ) {
            this.currentMusic.stop();
        }

        /*
         * Återställ originalmusiken.
         */
        this.currentMusic =
            this.previousMusic;

        this.previousMusic = null;

        /*
         * Fortsätt från tidigare position.
         */
        this.currentMusic.resume();

        this.currentMusic.setVolume(
            this._mixVolume(
                "music",
                this.currentMusic
                    .baseVolume ?? 1
            )
        );
    }

    stopMusic() {
        if (!this.currentMusic) {
            return;
        }

        this.currentMusic.stop();
        this.currentMusic = null;
        this.previousMusic = null;
    }

    /*
     * --------------------------------------------------
     * GLOBAL VOLUME
     * --------------------------------------------------
     */

    setMasterVolume(value) {
        this.masterVolume =
            Math.max(
                0,
                Math.min(1, value)
            );

        this._updateAllVolumes();
    }

    setMusicVolume(value) {
        this.musicVolume =
            Math.max(
                0,
                Math.min(1, value)
            );

        this._updateAllVolumes();
    }

    setSfxVolume(value) {
        this.sfxVolume =
            Math.max(
                0,
                Math.min(1, value)
            );

        this._updateAllVolumes();
    }

    _updateAllVolumes() {

        /*
         * Music
         */
        if (this.currentMusic) {
            this.currentMusic.setVolume(
                this._mixVolume(
                    "music",
                    this.currentMusic
                        .baseVolume ?? 1
                )
            );
        }

        /*
         * Loops
         */
        for (const key in this.loops) {
            const sound =
                this.loops[key];

            if (sound.isPlaying) {
                sound.setVolume(
                    this._mixVolume(
                        "sfx",
                        sound.baseVolume ?? 1
                    )
                );
            }
        }

        /*
         * One-shot SFX
         */
        for (const key in this.activeSfx) {
            const voices =
                this.activeSfx[key];

            for (const sound of voices) {
                if (sound.isPlaying) {
                    sound.setVolume(
                        this._mixVolume(
                            "sfx",
                            sound.baseVolume ?? 1
                        )
                    );
                }
            }
        }
    }

    /*
     * --------------------------------------------------
     * MUTE
     * --------------------------------------------------
     */

    mute() {
        if (this.scene.sound) {
            this.scene.sound.mute = true;
        }
    }

    unmute() {
        if (this.scene.sound) {
            this.scene.sound.mute = false;
        }
    }

    /*
     * --------------------------------------------------
     * CLEAR
     * --------------------------------------------------
     */

    clearRunSounds() {

        /*
         * Loops
         */
        for (const key in this.loops) {
            const sound =
                this.loops[key];

            if (sound?.isPlaying) {
                sound.stop();
            }
        }

        /*
         * One-shot SFX
         */
        for (const key in this.activeSfx) {
            for (
                const sound of this.activeSfx[key]
            ) {
                sound.stop();
                sound.destroy();
            }
        }

        this.activeSfx = {};
        this.lastPlayed = {};

        /*
         * Music
         */
        if (this.currentMusic) {
            this.currentMusic.stop();
            this.currentMusic = null;
        }

        this.previousMusic = null;
    }
}