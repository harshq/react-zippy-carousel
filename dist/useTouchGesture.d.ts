import React from 'react';
import { TouchPoint, SwipeProps } from './types';
export declare const useTouchGesture: ({ buffer, onSwipeStart, onSwipeLeft, onSwipeRight, onChangeDirection, onSwipe, onSwipeEnd, shouldStopListening, }: SwipeProps) => {
    startTouch: TouchPoint;
    swipeAmount: number;
    isSwiping: boolean;
    direction: string;
    handlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: (e: React.TouchEvent) => void;
        onTouchCancel: (e: React.TouchEvent) => void;
    };
};
