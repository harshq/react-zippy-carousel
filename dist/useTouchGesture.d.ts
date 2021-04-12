import * as React from 'react';
import { SwipeProps } from './types';
export declare const useTouchGesture: ({ buffer, onSwipeStart, onSwipeLeft, onSwipeRight, onChangeDirection, onSwipe, onSwipeEnd, shouldStopListening, }: SwipeProps) => {
    swipeAmount: number;
    isSwiping: boolean;
    handlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: (e: React.TouchEvent) => void;
        onTouchCancel: (e: React.TouchEvent) => void;
    };
};
