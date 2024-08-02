import {Container, Sprite, Text} from "pixi.js";
import {sound} from '@pixi/sound';
import gsap from "gsap";

import Button from "./Engine/Button/Button";
import Animation from "./Engine/Animation/Animation";

import Random from "./Engine/Utils/Random/Random";
import Timings from "./Engine/Utils/Timings/Timings";

class Game extends Container{
    constructor() {
        super();

        this._createSprites();
        this._createText();
        void this._playAnimations();
        this._createTween();
        this._createSoundButton();
        this._createRandomNumberGenerator();
    }

    private _createSprites(): void {
        const sprite1 = Sprite.from(global.game.Sprite1);
        sprite1.position = {x: 50, y: 50};

        const sprite2 = Sprite.from(global.game['Sprite2']);
        sprite2.position = {x: 150, y: 50};

        this.addChild( sprite1, sprite2 );
    }

    private _createText(): void {
        const text1 = new Text({ text: 'PIXI JS Template', style: {
            fontFamily: '04b30',
            fontSize: 24,
            fill: "#FFFFFF",
            align: 'center'
        }});
        text1.position = {x: 70, y: 15};

        const text2 = new Text({text:'Text 2',
            style: {
                fontFamily: 'arcadeclassic',
                fontSize: 24,
                fill: "#FFFFFF",
                align: 'center'
        }});
        text2.position = {x: 300, y: 50};

        const text3 = new Text({text: 'Text 3',
            style : {
                fontFamily: 'minecraftmedium',
                fontSize: 24,
                fill: "#FFFFFF",
                align: 'center'
        }});
        text3.position = {x: 300, y: 80};

        this.addChild( text1, text2, text3 );
    }

    private async _playAnimations(): Promise<void> {
        const animation1 = new Animation({
            prefix: "Animation",
            endingFrame: 4,
            loop: false,
            speedModifier: 0.05
        });
        animation1.position = {x: 50, y: 150};

        const animation2 = new Animation( {
            prefix: "Animation",
            endingFrame: 4,
            loop: true,
            speedModifier: 0.1
        });
        animation2.position = {x: 150, y: 150};

        const button = new Button(
            async ()=> {
                button.isActive = false;
                await animation1.play();
                button.isActive = true;
            },
            {
                active: global.game.ButtonActive,
                pressed: global.game.ButtonPressed,
                inactive: global.game.ButtonInactive
            }
        );
        button.position = {x:35, y: 250};

        this.addChild( animation1, animation2, button );

        void animation2.play();
    }

    private _createTween(): void {
        const tweenTarget = new Text({text: 'GSAP-TWEEN',
            style:{
                fontFamily: 'arcadeclassic',
                fontSize: 24,
                fill: "#FFFFFF",
                align: 'center'
        }});
        tweenTarget.position = {x: 280, y: 110};

        gsap.fromTo(tweenTarget, {pixi: {positionX: 280}}, {pixi: {positionX: 320}, duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1});

        this.addChild( tweenTarget );
    }

    private _createSoundButton(): void {
        const button = new Button(
            async ()=> {
                button.isActive = false;
                sound.play('Pickup_Coin');
                await Timings.wait(563);
                button.isActive = true;
            },
            {
                active: global.game.ButtonActive,
                pressed: global.game.ButtonPressed,
                inactive: global.game.ButtonInactive
            }
        );
        button.position = {x:280, y: 250};

        this.addChild( button );
    }

    private _createRandomNumberGenerator(): void {
        const text1 = new Text({ text: '0', style: {
                fontFamily: '04b30',
                fontSize: 24,
                fill: "#FFFFFF",
                align: 'center'
            }});
        text1.position = {x: 330, y: 170};
        text1.anchor.set(0.5);

        const button = new Button(
            async ()=> {
                text1.text = Random.range(0, 100);
            },
            {
                active: global.game.ButtonActive,
                pressed: global.game.ButtonPressed,
                inactive: global.game.ButtonInactive
            }
        );
        button.position = {x:280, y: 190};

        this.addChild( text1, button );
    }
}

export default Game;