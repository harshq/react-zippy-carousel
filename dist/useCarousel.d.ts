import * as React from 'react';
import { CarouselProps } from './types';
/**
 * useCarousel - THE carousel hook that you'll ever need ;)
 *
 * useSlider is a react hook for circular carousels. It assumes you have a
 * unsorted list (ul) with list items (li) as the HTML template for the
 * carousel.
 *
 * This hook will return only 3 items of less at any given point as slides.
 * User will see the 2nd element in sliders array, allowing us to animate
 * to next and previous slides.
 *
 * Once moved to next/prev slides, we update the slides array again so that,
 * the slide we moved to is in the middle, and the next and prev slides are
 * on both sides.
 *
 * @prop sliderContainerRef: Required! ref object of the carousel container.
 * @prop list: Required! array of items for the carousel.
 * @prop autoplay: Optional! boolean param to enable autoplay.
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
export declare const useCarousel: ({ carouselContainerRef, list, autoplay, interval, swipeThreshold }: CarouselProps) => {
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
    current: number;
    slides: any[];
    slideToImage: (imageToSlide: number) => void;
};
