AFRAME.registerComponent('game-globals', {
  init: function() {
    var el = this.el;
    var scene = AFRAME.scenes[0];

    var enemy = scene.components.pool__enemy.requestEntity();
    scene.components.pool__enemy.returnEntity(el);
  },
});
