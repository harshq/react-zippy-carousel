import { DIRECTIONS } from './constants';

export type SlideDirections =
    | typeof DIRECTIONS.RIGHT
    | typeof DIRECTIONS.LEFT
    | typeof DIRECTIONS.NONE;

export interface TouchPoint {
    clientX: number;
    clientY: number;
}

export interface SwipeProps {
    buffer?: TouchPoint;
    onSwipeStart?: (startTouch: TouchPoint) => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onChangeDirection?: (direction: string) => void;
    onSwipe?: (amount: number) => void;
    onSwipeEnd?: (
        amount: number,
        direction: SlideDirections,
        elementWidth: number,
    ) => void;
    shouldStopListening?: boolean;
}

export interface SwipeHandlers {
    onTouchStart: (e: React.TouchEvent<Element>) => void;
    onTouchMove: (e: React.TouchEvent<Element>) => void;
    onTouchEnd: (e: React.TouchEvent<Element>) => void;
    onTouchCancel: (e: React.TouchEvent<Element>) => void;
}