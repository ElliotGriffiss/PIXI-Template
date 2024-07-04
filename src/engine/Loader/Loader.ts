import {Assets} from "pixi.js";
import FontFaceObserver from "fontfaceobserver";

import AssetsManifest from "../../AssetManifest.json";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

class Loader {
    private _loadingScreen: LoadingScreen = null;

    async _preload(): Promise<void> {
        await Assets.init({manifest: AssetsManifest});
        global.preload = await Assets.loadBundle("preload");
    }

    createLoadingScreen(): void {
        this._loadingScreen = new LoadingScreen();
        global.app.stage.addChild(this._loadingScreen);
    }

    async load(): Promise<void> {
        await Promise.all( [
            global.game = await Assets.loadBundle("game", (progress)=> {
                this._loadingScreen.updateProgress(progress);
            }),
            global.sound = await Assets.loadBundle("sound"),
            ...( AssetsManifest.bundles[0].assets.map(async ({name})=> {
                    const font = new FontFaceObserver(name);
                    return await font.load().then(function () {
                    }).catch(function () {
                        console.error(`${name} has failed to load.`);
                    });
                })
            )
        ]);
    }

    destroyLoadingScreen(): void {
        this._loadingScreen.destroy();
    }
}


export default Loader;