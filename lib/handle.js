var supportProto = Object.getPrototypeOf({__proto__: null}) === null;
var ObjectElement = require('object-element');
var eventy = require('eventy');
var Drag = require('drag');

module.exports = Handle;

function Handle(el) {
  ObjectElement.call(this, el);

  var handle = eventy(this);
  var drag = new Drag(el);

  drag.on('drag', onDrag);

  function onDrag(drag) {
    handle.trigger('drag', drag);
  }
}

if (supportProto) {
  Handle.prototype.__proto__ = ObjectElement.prototype;
} else {
  Handle.prototype = Object.create(ObjectElement.prototype);
}

Handle.prototype.left = function (distance) {
  this.style.left = distance + 'px';
}
