import { GameObjects, Scene } from 'phaser';

import { SceneKeys } from '../game-scenes';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;

  constructor() {
    super(SceneKeys.MainMenu);
  }

  create() {
    const buttonWidth = 200;
    const buttonHeight = 50;

    const bg = this.add
      .rectangle(0, 0, buttonWidth, buttonHeight, 0x6666ff)
      .setStrokeStyle(4, 0xefefef);

    const label = this.add
      .text(0, 0, 'START', {
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5, 0.5);

    const button = this.add.container(300, 300, [bg, label]);

    button.setSize(buttonWidth, buttonHeight);
    button.setInteractive();

    button.on('pointerdown', () => {
      console.log('Button clicked');
      this.scene.start(SceneKeys.TicTacToeGameBoard);
    });
  }

  // create() {
  //   this.background = this.add.image(512, 384, 'background');
  //
  //   this.logo = this.add.image(512, 300, 'logo').setDepth(100);
  //
  //   this.title = this.add
  //     .text(512, 460, 'Main Menu', {
  //       fontFamily: 'Arial Black',
  //       fontSize: 38,
  //       color: '#ffffff',
  //       stroke: '#000000',
  //       strokeThickness: 8,
  //       align: 'center',
  //     })
  //     .setOrigin(0.5)
  //     .setDepth(100);
  //
  //   EventBus.emit('current-scene-ready', this);
  // }
  //
  // changeScene() {
  //   if (this.logoTween) {
  //     this.logoTween.stop();
  //     this.logoTween = null;
  //   }
  //
  //   this.scene.start(SceneKeys.Game);
  // }
  //
  // moveLogo(vueCallback: ({ x, y }: { x: number; y: number }) => void) {
  //   if (this.logoTween) {
  //     if (this.logoTween.isPlaying()) {
  //       this.logoTween.pause();
  //     } else {
  //       this.logoTween.play();
  //     }
  //   } else {
  //     this.logoTween = this.tweens.add({
  //       targets: this.logo,
  //       x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
  //       y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
  //       yoyo: true,
  //       repeat: -1,
  //       onUpdate: () => {
  //         if (vueCallback) {
  //           vueCallback({
  //             x: Math.floor(this.logo.x),
  //             y: Math.floor(this.logo.y),
  //           });
  //         }
  //       },
  //     });
  //   }
  // }
}
