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
 * items: rotated images array
 * offset: current user swipe value/scroll value
 * current: active image now
 * withAnimation: if the offset change needs to be animated
 *
 * lastAction: last user action. This is used to figure out the way the array was rotated and stop queuing actions
 * shouldUpdateArray: This is to figure out if the swipe was successful
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
                items: action.items,

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
                items: action.items,
                shouldUpdateArray: false,
                lastAction: undefined,
            };
        }
        default:
            return state;
    }
};
