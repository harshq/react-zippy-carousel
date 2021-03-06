import { CarouselState, CarouselAction } from './types';
import {
    INIT,
    SLIDE_PREVIOUS,
    SLIDE_NEXT,
    SLIDE_TO_IMAGE,
    SWIPE_SUCCESS,
    SWIPE_FAIL,
    SET_OFFSET,
    UPDATE_ITEMS,
    ACTION
} from './constants';
import { calcPrev, calcNext } from './utils';

/*
 * The carousel state holds following info.
 * items: rotated slides of carousel.
 * offset: current user swipe value/scroll value.
 * current: current slide index.
 * withAnimation: if the offset value needs to be animated.
 *
 * lastAction: last user action. This is used to figure out the way 'items' 
 *             array was rotated and to stop queuing actions.
 * shouldUpdateArray: This is to figure out if the swipe was successful.
 */
export const carouselReducer = (
    state: CarouselState,
    action: CarouselAction,
): CarouselState => {
    switch (action.type) {
        case INIT: {
            return {
                ...state,
                offset: action.offset,
                slides: action.slides,

                shouldUpdateArray: false,
                lastAction: undefined,
            };
        }
        case SLIDE_PREVIOUS: {
            const current = calcPrev(action.numberOfImages, state.current);
            return {
                ...state,
                current,
                offset: action.offset,
                withAnimation: true,
                shouldUpdateArray: true,
                lastAction: ACTION.PREV,
            };
        }
        case SLIDE_NEXT: {
            const current = calcNext(action.numberOfImages, state.current);
            return {
                ...state,
                current,
                offset: action.offset,
                withAnimation: true,
                shouldUpdateArray: true,
                lastAction: ACTION.NEXT,
            };
        }

        case SLIDE_TO_IMAGE: {
            return {
                ...state,
                current: action.imageToSlideTo,
                withAnimation: true,
                shouldUpdateArray: true,
            };
        }
        case SWIPE_SUCCESS: {
            const current =
                action.action === ACTION.NEXT
                    ? calcNext(action.numberOfImages, state.current)
                    : calcPrev(action.numberOfImages, state.current);
            return {
                ...state,
                current,
                offset: action.offset,
                withAnimation: true,
                shouldUpdateArray: true,
                lastAction: action.action,
            };
        }
        case SWIPE_FAIL: {
            return {
                ...state,
                offset: action.offset,
                withAnimation: true,
            };
        }
        case SET_OFFSET: {
            return {
                ...state,
                offset: action.offset,
                withAnimation: action.withAnimation,
            };
        }
        case UPDATE_ITEMS: {
            return {
                ...state,
                slides: action.slides,
                shouldUpdateArray: false,
                lastAction: undefined,
            };
        }
        default:
            return state;
    }
};
