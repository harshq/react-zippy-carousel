# react-zippy-carousel [![npm version](https://badge.fury.io/js/react-zippy-carousel.svg)](https://badge.fury.io/js/react-zippy-carousel)

Carousels with react hooks.

## Demo
![alt text](https://raw.githubusercontent.com/harshq/react-zippy-carousel-example/9840c4c9c2f2d31b4ae661c606fff1494723b1d1/example.gif "example")

## Installation

```yarn add react-zippy-carousel```
or
```npm install --save react-zippy-carousel```


## Usage

```js
import useCarousel from 'react-zippy-carousel';

const {
  handlers,
  listHandlers,
  offset,
  withAnimation,
  slideNext,
  slidePrev,
  items,
} = useCarousel({
  images: ['#98ddca', '#d5ecc2', '#ffd3b4', '#ffaaa7'],
  carouselContainerRef,
  autoplay: true,
});
          
```

## Example 

[demo project](https://github.com/harshq/react-zippy-carousel-example/blob/master/src/App.js)

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Harshana Abeyaratne
