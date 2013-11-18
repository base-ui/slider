var supportProto = Object.getPrototypeOf({__proto__: null}) === null;
var ObjectElement = require('object-element');
var eventy = require('eventy');
var Handle = require('./handle');

module.exports = Slider;

function Slider(element) {
  ObjectElement.call(this, element);

  var progress = 0;
  var slider = eventy(this);
  var handle = new Handle(slider.selectFirstChild('.handle').element);

  Object.defineProperty(slider, 'progress', {
    get: function () {
      return progress;
    },

    set: function (value) {
      progress = limit(value, 0, 1);
      handle.left(progress * (slider.width - handle.width));
    }
  });

  handle.on('drag', onDrag);

  function onDrag(drag) {
    var offsetWidth, moveX;

    offsetWidth = slider.width - handle.width;
    moveX = drag.pageX - slider.pageX - (handle.width / 2);
    moveX = limit(moveX, 0, offsetWidth);
    progress = moveX / offsetWidth;
    slider.trigger('progress', progress);
    handle.left(moveX);
  }
}

function limit(val, min, max) {
  if (val < min) {
    val = min;
  }

  if (val > max) {
    val = max;
  }

  return val;
}

if (supportProto) {
  Slider.prototype.__proto__ = ObjectElement.prototype;
} else {
  Slider.prototype = Object.create(ObjectElement.prototype);
}
