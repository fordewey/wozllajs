define([
    './../../var',
    './../../events/Event'
], function(W, Event) {

    var TouchEvent = function(param) {
        Event.apply(this, arguments);
        this.x = param.x;
        this.y = param.y;
        this.touch = params.touch;
    };

    TouchEvent.TOUCH_START = 'touchstart';
    TouchEvent.TOUCH_END = 'touchend';
    TouchEvent.TOUCH_MOVE = 'touchmove';
    TouchEvent.CLICK = 'click';

    W.inherits(TouchEvent, Event);

    return TouchEvent;

});