'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DIRECTIONS = {
    RIGHT: 'right',
    LEFT: 'left',
    NONE: 'none'
};

var useTouchGesture = function (_a) {
    var _b = _a.buffer, buffer = _b === void 0 ? { clientX: 0, clientY: 0 } : _b, onSwipeStart = _a.onSwipeStart, onSwipeLeft = _a.onSwipeLeft, onSwipeRight = _a.onSwipeRight, onChangeDirection = _a.onChangeDirection, onSwipe = _a.onSwipe, onSwipeEnd = _a.onSwipeEnd, _c = _a.shouldStopListening, shouldStopListening = _c === void 0 ? false : _c;
    var _d = React__default['default'].useState({
        clientX: 0,
        clientY: 0,
    }), startTouch = _d[0], setStartTouch = _d[1];
    var _e = React__default['default'].useState(0), swipeAmount = _e[0], setSwipeAmount = _e[1];
    var _f = React__default['default'].useState(DIRECTIONS.NONE), direction = _f[0], setDirection = _f[1];
    var _g = React__default['default'].useState(false), isSwiping = _g[0], setIsSwiping = _g[1];
    var handleTouchStart = function (e) {
        if (shouldStopListening) {
            return;
        }
        var initialTouch = {
            clientX: e.targetTouches[0].clientX,
            clientY: e.targetTouches[0].clientY,
        };
        setStartTouch(initialTouch);
        if (onSwipeStart) {
            onSwipeStart(e);
        }
    };
    // Negative value => swiped right. Positive value => swiped left.
    var getDirection = function (sign) {
        return sign === -1 ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT;
    };
    var handleTouchMove = function (e) {
        if (shouldStopListening) {
            return;
        }
        // get difference from the start
        var diffFromStartX = startTouch.clientX - e.targetTouches[0].clientX;
        var diffFromStartY = startTouch.clientY - e.targetTouches[0].clientY;
        if (e.cancelable && Math.abs(diffFromStartX) > Math.abs(diffFromStartY)) {
            e.preventDefault();
        }
        // swiping started. Set isSwiping flag to true.
        setIsSwiping(true);
        // set X axis difference as swipe amount with the buffer
        setSwipeAmount(diffFromStartX + buffer.clientX);
        if (onSwipe) {
            onSwipe(e);
        }
        // diffFromStartX will a positive or negative value depending on the
        // direction the element was swiped to.
        // Negative value => swiped right. Positive value => swiped left.
        var currentDirection = getDirection(Math.sign(diffFromStartX));
        // if this direction is changed from the previous direction
        // set it as the new direction and fire the callback.
        if (direction !== currentDirection) {
            setDirection(currentDirection);
            if (onChangeDirection) {
                onChangeDirection(currentDirection);
            }
            if (currentDirection === DIRECTIONS.RIGHT) {
                if (onSwipeRight) {
                    onSwipeRight();
                }
            }
            else if (currentDirection === DIRECTIONS.LEFT) {
                if (onSwipeLeft) {
                    onSwipeLeft();
                }
            }
        }
    };
    var handleTouchEnd = function (e) {
        if (shouldStopListening) {
            return;
        }
        if (onSwipeEnd) {
            onSwipeEnd(e);
        }
        setDirection(DIRECTIONS.NONE);
        setIsSwiping(false);
    };
    var handlers = {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onTouchCancel: handleTouchEnd,
    };
    return { startTouch: startTouch, swipeAmount: swipeAmount, isSwiping: isSwiping, direction: direction, handlers: handlers };
};

exports.useTouchGesture = useTouchGesture;
//# sourceMappingURL=index.js.map