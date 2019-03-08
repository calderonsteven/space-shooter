
AFRAME.registerComponent('enemy', {
  init: function() {
    this.el.addEventListener('collide', function (e) {
      // console.log('Player has collided with body #' + e.detail.body.id);

      // it's a bullet
      if(e.detail.body.el.components.bullet) {
        this.explotate(e);
      }
    }.bind(this));
  },

  explotate: function(e) {
    const el = e ? e.detail.target.el : this.el;
    const box = el.querySelector('a-box');
    !box || box.parentNode.removeChild(box);

    el.querySelector('[explosion]').setAttribute('mixin', 'explosion');

    setTimeout(function() {
      el.querySelector('[explosion]').setAttribute('mixin', '');
      el.parentNode.removeChild(el);
    }, 1000);
  }
});
