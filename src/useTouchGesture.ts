import * as React from 'react';
import { DIRECTIONS } from './constants';
import { SlideDirections, TouchPoint, SwipeProps } from './types';

export const useTouchGesture = ({
    buffer = { clientX: 0, clientY: 0 },
    onSwipeStart,
    onSwipeLeft,
    onSwipeRight,
    onChangeDirection,
    onSwipe,
    onSwipeEnd,
    shouldStopListening = false,
}: SwipeProps) => {
    const [startTouch, setStartTouch] = React.useState<TouchPoint>({
        clientX: 0,
        clientY: 0,
    });
    const [swipeAmount, setSwipeAmount] = React.useState<number>(0);
    const [direction, setDirection] = React.useState<SlideDirections>();

    const [isSwiping, setIsSwiping] = React.useState(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (shouldStopListening) {
            return;
        }

        const initialTouch = {
            clientX: e.targetTouches[0].clientX,
            clientY: e.targetTouches[0].clientY,
        };

        setStartTouch(initialTouch);

        if (onSwipeStart) {
            onSwipeStart(initialTouch);
        }
    };

    // Negative value => swiped right. Positive value => swiped left.
    const getDirection = (sign: number) =>
        sign === -1 ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT;

    const handleTouchMove = (e: React.TouchEvent) => {
        if (shouldStopListening) {
            return;
        }

        // get difference from the start
        const diffFromStartX = startTouch.clientX - e.targetTouches[0].clientX;
        const diffFromStartY = startTouch.clientY - e.targetTouches[0].clientY;

        if (e.cancelable && Math.abs(diffFromStartX) > Math.abs(diffFromStartY)) {
            e.preventDefault();
        }

        // swiping started. Set isSwiping flag to true.
        setIsSwiping(true);

        // set X axis difference as swipe amount with the buffer
        setSwipeAmount(diffFromStartX + buffer.clientX);

        if (onSwipe) {
            onSwipe(diffFromStartX + buffer.clientX);
        }

        // diffFromStartX will a positive or negative value depending on the
        // direction the element was swiped to.
        // Negative value => swiped right. Positive value => swiped left.
        const currentDirection = getDirection(Math.sign(diffFromStartX));

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
            } else if (currentDirection === DIRECTIONS.LEFT) {
                if (onSwipeLeft) {
                    onSwipeLeft();
                }
            }
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (shouldStopListening) {
            return;
        }

        const elementWidth = e.currentTarget.getBoundingClientRect().width;
        if (onSwipeEnd) {
            onSwipeEnd(swipeAmount, direction, elementWidth);
        }

        setDirection('');
        setIsSwiping(false);
    };

    const handlers = {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onTouchCancel: handleTouchEnd,
    };

    return { swipeAmount, isSwiping, handlers };
}