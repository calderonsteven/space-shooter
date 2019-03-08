var gameLogic = {
  fire: () => {
    // create the new bullet DOM, and adds the default components
    var scene = AFRAME.scenes[0];
    var bulletTemplate = document.getElementById('cannon');
    var cannonPosition = bulletTemplate.object3D.getWorldPosition();

    var newBullet = document.createElement('a-entity');
    newBullet.setAttribute('position', cannonPosition);
    newBullet.setAttribute('mixin', 'bullet');

    // bulletTemplate.appendChild(newBullet);
    scene.appendChild(newBullet);
  },

  teleport: () => {
    const player = document.getElementById('the-camera');
    const ship = document.getElementById('space-ship');
    const shipPosition = ship.object3D.getWorldPosition();
    const newPlayerPosition = {
      x: shipPosition.x,
      y: player.getAttribute('position').y,
      z: shipPosition.z
    };

    player.setAttribute('position', newPlayerPosition);
  }
}
