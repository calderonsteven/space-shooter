
AFRAME.registerComponent('joycon-controls', {
  clock: new THREE.Clock(true),
  totalRotationTo: 0,
  currentRotationFrom: undefined,

  checkDpadValue: function() {
    const gamepadControl = this.el.components['gamepad-controls'];
    if(!gamepadControl) { return false; }

    const gamepad = gamepadControl.getGamepad();
    if(!gamepad) { return false; }

    const joyconDpadAxis = 9;
    const joyconDpadDefault = 1.2857143878936768; // dpad released
    const dpadValue = gamepadControl.getAxis(joyconDpadAxis);

    return (dpadValue != joyconDpadDefault) ? dpadValue : false;
  },
  checkButton: function(index) {
    const gamepadControl = this.el.components['gamepad-controls'];
    if(!gamepadControl) { return false; }

    return gamepadControl.buttons[index];
  },
  checkForGameAction: function(e) {
    console.log(e.detail);

    switch (e.detail.index) {
      case 5: // 5 = L
        gameLogic.fire();
        break;
      case 3: // 3 = X
        gameLogic.teleport();
        break;
    }
  },

  init: function() {
    this.el.addEventListener('gamepadbuttondown', this.checkForGameAction);
  },
  tick: function() {
    // rotate the ship if the dpad is pressed
    let dpadValue = this.checkDpadValue();
    if(dpadValue) {
      dpadValue = dpadValue == -1 ? 0 : dpadValue;
      const rotationSpeed = .5;
      const rotationFriction = .3;
      const rotationFrom = this.el.object3D.getWorldRotation().toVector3();
      const rotationTo = rotationFrom.clone();
      const newYRotation = rotationFrom.y + (dpadValue * rotationSpeed * rotationFriction);
      rotationTo.setY(newYRotation);

      // use linear interpolation to calculate rotation
      rotationTo.lerp(rotationFrom, this.clock.getDelta());
      this.el.object3D.rotation.setFromVector3(rotationTo);
    }

    // 1 = A
    if( this.checkButton(1) ) {
      this.el.object3D.translateZ(-0.07);
    }
    // 0 = B
    if( this.checkButton(0) ) {
      this.el.object3D.translateZ(0.1);
    }
  }
});
