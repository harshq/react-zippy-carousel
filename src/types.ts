import { DIRECTIONS } from './constants';

export type SlideDirections =
    | typeof DIRECTIONS.RIGHT
    | typeof DIRECTIONS.LEFT
    | undefined;

export interface TouchPoint {
    clientX: number;
    clientY: number;
}