import { Scene } from 'phaser';
import { GAME_ASSETS } from '../game-assets';
import { SceneKeys } from '../game-scenes';

export class Boot extends Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image(GAME_ASSETS.IMAGES.BG, 'assets/bg.png');
  }

  create() {
    this.scene.start(SceneKeys.Preloader);
  }
}
