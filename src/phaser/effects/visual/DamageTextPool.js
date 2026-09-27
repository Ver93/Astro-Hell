export default class DamageTextPool {

    constructor(game, size = 200) {

        this.game = game;
        this.pool = [];

        for (
            let i = 0;
            i < size;
            i++
        ) {

            const text =
                game.scene.add.text(
                    0,
                    0,
                    "",
                    {
                        fontFamily: "Arial",
                        fontSize: "22px",
                        color: "#fdfdfd",
                        stroke: "#3a1600",
                        strokeThickness: 6
                    }
                );

            text.setOrigin(0.5);

            text.setDepth(1000);

            text.setVisible(false);

            this.pool.push(text);
        }
    }

    get() {

        return this.pool.find(
            text => !text.visible
        );
    }

    release(text) {

        text.setVisible(false);

        text.setAlpha(1);

        text.setScale(3);

        text.setAngle(0);

        text.setText("");

        text.setColor(
            "#fdfdfc"
        );

        text.setStroke(
            "#3a1600",
            6
        );
    }
}