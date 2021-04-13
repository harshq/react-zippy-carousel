import * as React from 'react';
import { CarouselProps } from './types';
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
export declare const useCarousel: ({ carouselContainerRef, images, autoplay, }: CarouselProps) => {
    handlers: {
        onTouchStart: (e: React.TouchEvent<Element>) => void;
        onTouchMove: (e: React.TouchEvent<Element>) => void;
        onTouchEnd: (e: React.TouchEvent<Element>) => void;
        onTouchCancel: (e: React.TouchEvent<Element>) => void;
    };
    listHandlers: {
        onTransitionEnd: () => void;
    };
    offset: number;
    withAnimation: boolean;
    slideNext: () => void;
    slidePrev: () => void;
    currentImage: number;
    items: any[];
    slideToImage: (imageToSlide: number) => void;
};
