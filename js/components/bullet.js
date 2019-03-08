AFRAME.registerComponent('bullet', {
  // schema: {type: 'boolean'},
  init: function() {
    var el = this.el;

    // hack: setTimeout -- needed because the init function is called somthing in cannonjs is not initialized
    setTimeout(() => {
      var bulletTemplate = document.getElementById('cannon');
      var cannonPosition = bulletTemplate.object3D.getWorldDirection();

      // the impulse is based on the tank direction
      cannonPosition.multiplyScalar(-100);
      var impulse = new CANNON.Vec3(cannonPosition.x, 10, cannonPosition.z);
      var point = new CANNON.Vec3().copy(el.body.position);

      // imulse the bullet // need to update de mass properties
      el.setAttribute('material', {color: 'green'});
      el.body.fixedRotation = true;
      el.body.updateMassProperties();
      el.body.applyLocalImpulse(impulse, point);
    }, 1);
  },
});
