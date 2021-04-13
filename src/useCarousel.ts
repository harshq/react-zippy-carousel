import * as React from 'react';
import {
    DIRECTIONS,
    ACTION,
    INIT,
    SLIDE_NEXT,
    SLIDE_PREVIOUS,
    SLIDE_TO_IMAGE,
    SET_OFFSET,
    SWIPE_SUCCESS,
    SWIPE_FAIL,
    UPDATE_ITEMS
} from './constants';
import { CarouselProps, CarouselState } from './types';
import { useTouchGesture } from './useTouchGesture';
import { carouselReducer } from './carouselReducer';
import { initalizeImageArray, manipulateArray } from './utils';

const AUTOPLAY_INTERVAL = 5000;
const SWIPE_THRESHOLD = 0.3;

const initialCarouselState: CarouselState = {
    items: [],
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
export const useCarousel = ({
    carouselContainerRef,
    images,
    autoplay = false,
}: CarouselProps) => {
    // keeps the timer
    const timer = React.useRef(0);
    // keeps the slider width
    const carouselWidth = React.useRef(0);
    // init autoplay
    React.useEffect(() => startAutoplay(), []);
    // reducer to keep the slider state
    const [state, dispatch] = React.useReducer(
        carouselReducer,
        initialCarouselState,
    );

    const init = () => {
        carouselWidth.current = carouselContainerRef.current
            ? carouselContainerRef.current.offsetWidth
            : 0;

        const items = initalizeImageArray(images);
        dispatch({ type: INIT, offset: carouselWidth.current, items });
    };

    // Starting point on the slider
    // Will update if the slider width or images array changed
    React.useEffect(init, [
        carouselContainerRef.current ? carouselContainerRef.current.offsetWidth : 0,
        images.length,
    ]);

    // goto next slide width animation
    // restart autoplay
    // if the 'state.lastAction' is not cleared or array has 1 image, prevent action
    const slideNext = () => {
        if (state.lastAction || images.length < 2) {
            return;
        }
        startAutoplay();
        dispatch({
            type: SLIDE_NEXT,
            numberOfImages: images.length,
            offset: carouselWidth.current * 2,
        });
    };

    // goto previous slide width animation
    // restart autoplay
    // if the 'state.lastAction' is not cleared or array has 1 image, prevent action
    const slidePrev = () => {
        if (state.lastAction || images.length < 2) {
            return;
        }
        startAutoplay();
        dispatch({
            type: SLIDE_PREVIOUS,
            numberOfImages: images.length,
            offset: 0,
        });
    };

    // goto a specific image in the carousel
    const slideToImage = (imageToSlideTo: number) => {
        dispatch({
            type: SLIDE_TO_IMAGE,
            imageToSlideTo,
        });
    };

    // start autoplay
    const startAutoplay = () => {
        if (images.length >= 2 && autoplay) {
            clearInterval(timer.current);
            timer.current = window.setInterval(() => {
                slideNext();
            }, AUTOPLAY_INTERVAL);
        }
    };

    const clearAutoplay = () => {
        clearInterval(timer.current);
    };

    const { handlers, swipeAmount, direction } = useTouchGesture({
        shouldStopListening: state.withAnimation,
        buffer: { clientY: 0, clientX: carouselWidth.current },
        onSwipeStart: () => clearAutoplay(),
        onSwipe: (e) => {
            if (images.length < 2) {
                return;
            }
            dispatch({ type: SET_OFFSET, offset: swipeAmount, withAnimation: false });
        },
        onSwipeEnd: () => {
            if (images.length < 2 || !direction) {
                return;
            }

            startAutoplay();

            const swipeEndPosition = swipeAmount / carouselWidth.current;
            const swipeEndFraction =
                direction === DIRECTIONS.LEFT
                    ? swipeEndPosition - Math.trunc(swipeEndPosition)
                    : 1 - (swipeEndPosition - Math.trunc(swipeEndPosition));

            if (Math.abs(swipeEndFraction) > SWIPE_THRESHOLD) {
                // successful swipe
                const jumpDistance =
                    direction === DIRECTIONS.RIGHT ? 0 : carouselWidth.current * 2;
                const action =
                    direction === DIRECTIONS.RIGHT ? ACTION.PREV : ACTION.NEXT;

                dispatch({
                    type: SWIPE_SUCCESS,
                    offset: jumpDistance,
                    action,
                    numberOfImages: images.length,
                });
            } else {
                // fail
                dispatch({ type: SWIPE_FAIL, offset: carouselWidth.current });
            }
        },
    });

    // onTransitionEnd handler for 'ul'
    const onTransitionEnd = () => {
        if (state.shouldUpdateArray) {
            const reverse = state.lastAction === ACTION.NEXT ? false : true;
            const items = manipulateArray(state.items, reverse);
            dispatch({ type: UPDATE_ITEMS, items });
        }

        resetOffset();
    };

    // jump back to the middle
    const resetOffset = () => {
        dispatch({
            type: SET_OFFSET,
            offset: carouselWidth.current,
            withAnimation: false,
        });
    };

    return {
        handlers,
        listHandlers: { onTransitionEnd },
        offset: state.offset,
        withAnimation: state.withAnimation,
        slideNext,
        slidePrev,
        currentImage: state.current,
        items: state.items.slice(0, 3),
        slideToImage: (imageToSlide: number) => slideToImage(imageToSlide),
    };
};