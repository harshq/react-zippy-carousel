import React from 'react';
import { DIRECTIONS, ACTION, INIT, SLIDE_PREVIOUS, SLIDE_NEXT, SLIDE_TO_IMAGE, SWIPE_SUCCESS, SWIPE_FAIL, SET_OFFSET, UPDATE_ITEMS } from './constants';
export declare type SlideDirections = typeof DIRECTIONS.RIGHT | typeof DIRECTIONS.LEFT | typeof DIRECTIONS.NONE;
export interface TouchPoint {
    clientX: number;
    clientY: number;
}
export declare type Actions = typeof ACTION.NEXT | typeof ACTION.PREV | undefined;
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
export interface CarouselProps {
    carouselContainerRef: React.RefObject<HTMLDivElement>;
    autoplay?: boolean;
    list: any[];
    interval?: number;
    swipeThreshold?: number;
}
export interface CarouselState {
    slides: any[];
    offset: number;
    current: number;
    withAnimation: boolean;
    lastAction: Actions;
    shouldUpdateArray: boolean;
}
interface Init {
    type: typeof INIT;
    offset: number;
    slides: any[];
}
interface SlidePrevious {
    type: typeof SLIDE_PREVIOUS;
    offset: number;
    numberOfImages: number;
}
interface SlideNext {
    type: typeof SLIDE_NEXT;
    offset: number;
    numberOfImages: number;
}
interface SlideToImage {
    type: typeof SLIDE_TO_IMAGE;
    imageToSlideTo: number;
}
interface SwipeSuccess {
    type: typeof SWIPE_SUCCESS;
    offset: number;
    action: Actions;
    numberOfImages: number;
}
interface SwipeFail {
    type: typeof SWIPE_FAIL;
    offset: number;
}
interface SetOffset {
    type: typeof SET_OFFSET;
    offset: number;
    withAnimation: boolean;
}
interface UpdateArray {
    type: typeof UPDATE_ITEMS;
    slides: any[];
}
export declare type CarouselAction = Init | SetOffset | SwipeSuccess | SwipeFail | SlideNext | SlideToImage | SlidePrevious | UpdateArray;
export {};
