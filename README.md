# react-zippy-carousel [![npm version](https://badge.fury.io/js/react-zippy-carousel.svg)](https://badge.fury.io/js/react-zippy-carousel)

React hook for carousels. Supports gestures in mobile browsers.
- uses css animations
- renders only 3 slides at any given time
- supports autoplay, gestures and snap to reset
- very light weight

## Demo
![alt text](https://raw.githubusercontent.com/harshq/react-zippy-carousel-example/master/example.gif "example")

## Installation

```yarn add react-zippy-carousel```
or
```npm install --save react-zippy-carousel```


## Usage

```js
import useCarousel from 'react-zippy-carousel';

const {
  handlers, // Listeners for 'li's
  listHandlers, // listeners for 'ul'
  offset, // scroll position for 'ul'
  withAnimation, // whether you need to animate the offset
  slideNext, // slide to next
  slidePrev, // slider to previous
  slides, // slides you want to render
  current // current slide of the carousel  
} = useCarousel({
  list: ['#98ddca', '#d5ecc2', '#ffd3b4', '#ffaaa7'],
  carouselContainerRef,
});
          
```

## Example 

[demo project](https://github.com/harshq/react-zippy-carousel-example/blob/master/src/App.js)

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Harshana Abeyaratne
