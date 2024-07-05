import {Assets} from "pixi.js";
import FontFaceObserver from "fontfaceobserver";

import AssetsManifest from "../../AssetManifest.json";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

class Loader {
    private _loadingScreen: LoadingScreen = null;
    private _assetsProgress: number = 0;
    private _soundProgress: number = 0;

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
                this._updateSoundProgress(progress);
            }),
            global.sound = await Assets.loadBundle("sound", (progress) => {
                this._updateAssetProgress(progress);
            }),
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

    private _updateAssetProgress(progress: number): void {
        this._assetsProgress = progress / 2;
        this._loadingScreen.updateProgress(this._assetsProgress + this._soundProgress);
    }

    private _updateSoundProgress(progress: number): void {
        this._soundProgress = progress / 2;
        this._loadingScreen.updateProgress(this._assetsProgress + this._soundProgress);
    }

    destroyLoadingScreen(): void {
        this._loadingScreen.destroy();
    }
}


export default Loader;