import * as React from 'react';
import React__default from 'react';

var DIRECTIONS = {
    RIGHT: 'right',
    LEFT: 'left',
    NONE: 'none'
};
var ACTION = {
    NEXT: 'next',
    PREV: 'prev',
};
var INIT = 'INIT';
var SLIDE_NEXT = 'SLIDE_NEXT';
var SLIDE_PREVIOUS = 'SLIDE_PREVIOUS';
var SLIDE_TO_IMAGE = 'SLIDE_TO_IMAGE';
var SET_OFFSET = 'SET_OFFSET';
var SWIPE_SUCCESS = 'SWIPE_SUCCESS';
var SWIPE_FAIL = 'SWIPE_FAIL';
var UPDATE_ITEMS = 'UPDATE_ITEMS';

// NOTE: we only care about the X axis for carousel.
var useTouchGesture = function (_a) {
    var _b = _a.buffer, buffer = _b === void 0 ? { clientX: 0, clientY: 0 } : _b, onSwipeStart = _a.onSwipeStart, onSwipeLeft = _a.onSwipeLeft, onSwipeRight = _a.onSwipeRight, onChangeDirection = _a.onChangeDirection, onSwipe = _a.onSwipe, onSwipeEnd = _a.onSwipeEnd, _c = _a.shouldStopListening, shouldStopListening = _c === void 0 ? false : _c;
    var _d = React__default.useState({
        clientX: 0,
        clientY: 0,
    }), startTouch = _d[0], setStartTouch = _d[1];
    var _e = React__default.useState(0), swipeAmount = _e[0], setSwipeAmount = _e[1];
    var _f = React__default.useState(DIRECTIONS.NONE), direction = _f[0], setDirection = _f[1];
    var _g = React__default.useState(false), isSwiping = _g[0], setIsSwiping = _g[1];
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
        // if we know user is scrolling horizontally, prevent vertical scroll
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/*
 * Calculate next index
 */
var calcNext = function (numOfImages, currentImage) {
    return (currentImage + 1) % numOfImages;
};
/*
 * Calculate previous index
 */
var calcPrev = function (numOfImages, currentImage) {
    return (currentImage - 1 + numOfImages) % numOfImages;
};
/*
 * Rotates the array.
 * eg: [1, 2, 3, 4] => [2, 3, 4, 1]
 * if reverse: [1, 2, 3, 4] => [4, 1, 2, 3]
 */
// tslint:disable-next-line: no-any
var manipulateArray = function (arr, reverse) {
    var newArr = __spreadArray([], arr);
    if (reverse) {
        newArr.unshift(newArr.pop());
    }
    else {
        newArr.push(newArr.shift());
    }
    return newArr;
};
/*
 * Makes sure there are 3 elements in the array IF swipeable.
 *
 * length = 0: Return empty array
 * length = 1: Repeat the element as users see the 2nd element in the list.
 *             We dont need 3 elements as the list isnt swipeable if there are only 1 element.
 * length = 2: This is bit tricky. Repeat elements in the array and rotate once.
 *             This will make the 'state.current' go from 1 => 2 => 1, but list will have 4 elements.
 *             User will see 2 elements rotating.
 *
 * in any other case rotate the array once.
 */
// tslint:disable-next-line: no-any
var initalizeImageArray = function (items) {
    var arr = __spreadArray([], items);
    if (arr.length === 0) {
        return [];
    }
    else if (arr.length === 1) {
        return __spreadArray(__spreadArray([], arr), arr);
    }
    else if (arr.length === 2) {
        arr = __spreadArray(__spreadArray([], arr), arr);
    }
    return manipulateArray(arr, true);
};

/*
 * The carousel state holds following info.
 * items: rotated images array
 * offset: current user swipe value/scroll value
 * current: active image now
 * withAnimation: if the offset change needs to be animated
 *
 * lastAction: last user action. This is used to figure out the way the array was rotated and stop queuing actions
 * shouldUpdateArray: This is to figure out if the swipe was successful
 */
var carouselReducer = function (state, action) {
    switch (action.type) {
        case INIT: {
            return __assign(__assign({}, state), { offset: action.offset, slides: action.slides, shouldUpdateArray: false, lastAction: undefined });
        }
        case SLIDE_PREVIOUS: {
            var current = calcPrev(action.numberOfImages, state.current);
            return __assign(__assign({}, state), { current: current, offset: action.offset, withAnimation: true, shouldUpdateArray: true, lastAction: ACTION.PREV });
        }
        case SLIDE_NEXT: {
            var current = calcNext(action.numberOfImages, state.current);
            return __assign(__assign({}, state), { current: current, offset: action.offset, withAnimation: true, shouldUpdateArray: true, lastAction: ACTION.NEXT });
        }
        case SLIDE_TO_IMAGE: {
            return __assign(__assign({}, state), { current: action.imageToSlideTo, withAnimation: true, shouldUpdateArray: true });
        }
        case SWIPE_SUCCESS: {
            var current = action.action === ACTION.NEXT
                ? calcNext(action.numberOfImages, state.current)
                : calcPrev(action.numberOfImages, state.current);
            return __assign(__assign({}, state), { current: current, offset: action.offset, withAnimation: true, shouldUpdateArray: true, lastAction: action.action });
        }
        case SWIPE_FAIL: {
            return __assign(__assign({}, state), { offset: action.offset, withAnimation: true });
        }
        case SET_OFFSET: {
            return __assign(__assign({}, state), { offset: action.offset, withAnimation: action.withAnimation });
        }
        case UPDATE_ITEMS: {
            return __assign(__assign({}, state), { slides: action.slides, shouldUpdateArray: false, lastAction: undefined });
        }
        default:
            return state;
    }
};

var initialCarouselState = {
    slides: [],
    offset: 0,
    current: 0,
    withAnimation: false,
    lastAction: undefined,
    shouldUpdateArray: false,
};
/**
 * useCarousel - THE carousel helper that you'll ever need ;)
 *
 * useSlider is a react hook that helps you build circular carousels. It internally makes use
 * of the useSwipe hook. It Assumes that you have an unsorted list with list items. But not
 * necessarily. useSlider will always return less than 3 items. Users will always see the
 * 2nd element in items array.
 *
 * This accepts couple of things as required props.
 *
 * @prop sliderContainerRef: ref object of the carousel container. This will be used to figure out
 *                           scroll distance when navigating to next/prev slide.
 * @prop images: array of items for the carousel.
 * @prop autoplay: optional boolean param to enable autoplay.
 *
 * @returns handlers: Listeners for 'li's
 * @returns listHandlers: Listeners for 'ul'
 * @returns offset: Scroll position for the animations
 * @returns withAnimation: You will have change of scroll positions. Only animate them if this is true
 * @returns slideNext: Function to animate the carousel to the next slide
 * @returns slidePrev: Function to animate the carousel to the previous slide
 * @returns currentImage: Index of the current image from the original image array that passed in as a prop
 * @returns items: 3 or less element array that.
 *
 */
var useCarousel = function (_a) {
    var carouselContainerRef = _a.carouselContainerRef, list = _a.list, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b, _c = _a.interval, interval = _c === void 0 ? 5000 : _c, _d = _a.swipeThreshold, swipeThreshold = _d === void 0 ? 0.3 : _d;
    // keeps the timer
    var timer = React.useRef(0);
    // keeps the slider width
    var carouselWidth = React.useRef(0);
    // init autoplay
    React.useEffect(function () { return startAutoplay(); }, []);
    // reducer to keep the slider state
    var _e = React.useReducer(carouselReducer, initialCarouselState), state = _e[0], dispatch = _e[1];
    var init = function () {
        carouselWidth.current = carouselContainerRef.current
            ? carouselContainerRef.current.offsetWidth
            : 0;
        var slides = initalizeImageArray(list);
        dispatch({ type: INIT, offset: carouselWidth.current, slides: slides });
    };
    // Starting point on the slider
    // Will update if the slider width or images array changed
    React.useEffect(init, [
        carouselContainerRef.current ? carouselContainerRef.current.offsetWidth : 0,
        list.length,
    ]);
    var _f = useTouchGesture({
        shouldStopListening: state.withAnimation,
        buffer: { clientY: 0, clientX: carouselWidth.current },
        onSwipeStart: function () { return handleSwipeStart(); },
        onSwipeEnd: function () { return handleSwipeEnd(); }
    }), handlers = _f.handlers, swipeAmount = _f.swipeAmount, direction = _f.direction;
    // update offset based on swipeAmount
    React.useEffect(function () {
        if (list.length < 2) {
            return;
        }
        dispatch({ type: SET_OFFSET, offset: swipeAmount, withAnimation: false });
    }, [swipeAmount]);
    var handleSwipeStart = function () {
        clearAutoplay();
    };
    var handleSwipeEnd = function () {
        if (list.length < 2 || !direction) {
            return;
        }
        startAutoplay();
        var swipeEndPosition = swipeAmount / carouselWidth.current;
        var swipeEndFraction = direction === DIRECTIONS.LEFT
            ? swipeEndPosition - Math.trunc(swipeEndPosition)
            : 1 - (swipeEndPosition - Math.trunc(swipeEndPosition));
        if (Math.abs(swipeEndFraction) > swipeThreshold) {
            // successful swipe
            var jumpDistance = direction === DIRECTIONS.RIGHT ? 0 : carouselWidth.current * 2;
            var action = direction === DIRECTIONS.RIGHT ? ACTION.PREV : ACTION.NEXT;
            dispatch({
                type: SWIPE_SUCCESS,
                offset: jumpDistance,
                action: action,
                numberOfImages: list.length,
            });
        }
        else {
            // fail
            dispatch({ type: SWIPE_FAIL, offset: carouselWidth.current });
        }
    };
    var startAutoplay = function () {
        if (list.length >= 2 && autoplay) {
            clearInterval(timer.current);
            timer.current = window.setInterval(function () {
                slideNext();
            }, interval);
        }
    };
    var clearAutoplay = function () {
        clearInterval(timer.current);
    };
    // goto next slide with animation
    // restart autoplay
    // if the 'state.lastAction' is not cleared or array has 1 image, prevent action
    var slideNext = function () {
        if (state.lastAction || list.length < 2) {
            return;
        }
        startAutoplay();
        dispatch({
            type: SLIDE_NEXT,
            numberOfImages: list.length,
            offset: carouselWidth.current * 2,
        });
    };
    // go to previous slide with animation
    // restart autoplay
    // if the 'state.lastAction' is not cleared or array has 1 image, prevent action
    var slidePrev = function () {
        if (state.lastAction || list.length < 2) {
            return;
        }
        startAutoplay();
        dispatch({
            type: SLIDE_PREVIOUS,
            numberOfImages: list.length,
            offset: 0,
        });
    };
    // go to a specific slide in the carousel
    var slideToImage = function (imageToSlideTo) {
        dispatch({
            type: SLIDE_TO_IMAGE,
            imageToSlideTo: imageToSlideTo,
        });
    };
    // jump back to the middle
    var resetOffset = function () {
        dispatch({
            type: SET_OFFSET,
            offset: carouselWidth.current,
            withAnimation: false,
        });
    };
    // onTransitionEnd handler for 'ul'
    var onTransitionEnd = function () {
        if (state.shouldUpdateArray) {
            var reverse = state.lastAction === ACTION.NEXT ? false : true;
            var slides = manipulateArray(state.slides, reverse);
            dispatch({ type: UPDATE_ITEMS, slides: slides });
        }
        resetOffset();
    };
    return {
        handlers: handlers,
        listHandlers: { onTransitionEnd: onTransitionEnd },
        offset: state.offset,
        withAnimation: state.withAnimation,
        slideNext: slideNext,
        slidePrev: slidePrev,
        currentImage: state.current,
        slides: state.slides.slice(0, 3),
        slideToImage: function (imageToSlide) { return slideToImage(imageToSlide); },
    };
};

export default useCarousel;
export { useTouchGesture };
//# sourceMappingURL=index.es.js.map
