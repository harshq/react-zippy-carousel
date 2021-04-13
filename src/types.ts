import React from 'react';
import {
    DIRECTIONS,
    ACTION,
    INIT,
    SLIDE_PREVIOUS,
    SLIDE_NEXT,
    SLIDE_TO_IMAGE,
    SWIPE_SUCCESS,
    SWIPE_FAIL,
    SET_OFFSET,
    UPDATE_ITEMS
} from './constants';

export type SlideDirections =
    | typeof DIRECTIONS.RIGHT
    | typeof DIRECTIONS.LEFT
    | typeof DIRECTIONS.NONE;

export interface TouchPoint {
    clientX: number;
    clientY: number;
}

export type Actions = typeof ACTION.NEXT | typeof ACTION.PREV | undefined;

export interface SwipeProps {
    buffer?: TouchPoint;
    onSwipeStart?: (e: React.TouchEvent) => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onChangeDirection?: (direction: string) => void;
    onSwipe?: (e: React.TouchEvent) => void;
    onSwipeEnd?: (e: React.TouchEvent) => void;
    shouldStopListening?: boolean;
}

export interface SwipeHandlers {
    onTouchStart: (e: React.TouchEvent<Element>) => void;
    onTouchMove: (e: React.TouchEvent<Element>) => void;
    onTouchEnd: (e: React.TouchEvent<Element>) => void;
    onTouchCancel: (e: React.TouchEvent<Element>) => void;
}

export interface SliderProps {
    sliderContainerRef: React.RefObject<HTMLDivElement>;
    autoplay?: boolean;
    // tslint:disable-next-line: no-any
    images: any[];
}

export interface SliderState {
    // tslint:disable-next-line: no-any
    items: any[];
    offset: number;
    current: number;
    withAnimation: boolean;

    lastAction: Actions;
    shouldUpdateArray: boolean;
}

/*
 * Fired on init
 * offset: set to sliderWidth. Users see the 2nd element in the list initially
 * items: initial items array after initalizeImageArray method
 */
interface Init {
    type: typeof INIT;
    offset: number;
    // tslint:disable-next-line: no-any
    items: any[];
}

/*
 * Fired when user click prev
 * offset: set to 0. User should see the carousel animated to 1st element
 * numberOfImages: number of items in the passed array. Used to calculate the prev index
 */
interface SlidePrevious {
    type: typeof SLIDE_PREVIOUS;
    offset: number;
    numberOfImages: number;
}

/*
 * Fired when user click prev
 * offset: set to (sliderWidth * 2). User should see the carousel animated to 3rd element
 * numberOfImages: number of items in the passed array. Used to calculate the prev index
 */
interface SlideNext {
    type: typeof SLIDE_NEXT;
    offset: number;
    numberOfImages: number;
}

/**
 * Fired when user clicks on an image outside the context of the slider
 * like on a thumbnail list of all images
 * and we want to update the slider image to the image user clicked on
 */
interface SlideToImage {
    type: typeof SLIDE_TO_IMAGE;
    imageToSlideTo: number;
}

/*
 * Fired when user swipes more than the SWIPE_THRESHOLD
 * offset: will be set to either 0 or (sliderWidth * 2) depending on the swiped direction.
 * action: either be next or prev
 * numberOfImages: number of items in the passed array. Used to calculate the prev index
 */
interface SwipeSuccess {
    type: typeof SWIPE_SUCCESS;
    offset: number;
    action: Actions;
    numberOfImages: number;
}

/*
 * Fired when user didn't more than the SWIPE_THRESHOLD
 * offset: set to sliderWidth. User should see the carousel animated back to 1st element
 */
interface SwipeFail {
    type: typeof SWIPE_FAIL;
    offset: number;
}

/*
 * Sets a scroll position
 * offset: scroll position
 * withAnimation: if the scroll position change should animate
 */
interface SetOffset {
    type: typeof SET_OFFSET;
    offset: number;
    withAnimation: boolean;
}

/*
 * Updates the items array when navigated to next/prev
 * items: new array to be set as items
 */
interface UpdateArray {
    type: typeof UPDATE_ITEMS;
    // tslint:disable-next-line: no-any
    items: any[];
}

export type SliderAction =
    | Init
    | SetOffset
    | SwipeSuccess
    | SwipeFail
    | SlideNext
    | SlideToImage
    | SlidePrevious
    | UpdateArray;