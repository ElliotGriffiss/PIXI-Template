import {Application} from "pixi.js";
import Game from './Game';
import "./style.css";

import {gsap} from 'gsap';
import { PixiPlugin } from "gsap/PixiPlugin";

import Loader from "./Engine/Loader/Loader";

/// Global Class To Handle Game Management
export class PixiAppManager {
    constructor() {
        const app = new Application();

        void app.init({
            canvas: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: "#000000",
            width: 480,
            height: 320,
        });

        global.app = app;
        // #!if ENV === "development"
        globalThis.__PIXI_APP__ = app;
        // #!endif

        // Register app with GSAP.
        PixiPlugin.registerPIXI(app);
        gsap.registerPlugin(PixiPlugin);

        void this._setup();
    }

    private async _setup(): Promise<void> {
        const loader = new Loader();

        await loader._preload();
        loader.createLoadingScreen();
        await loader.load();
        app.stage.addChild(new Game());
        loader.destroyLoadingScreen();
    }
}

new PixiAppManager();