
/*
 * Calculate next index
 */
export const calcNext = (numOfImages: number, currentImage: number) => {
    return (currentImage + 1) % numOfImages;
};

/*
 * Calculate previous index
 */
export const calcPrev = (numOfImages: number, currentImage: number) => {
    return (currentImage - 1 + numOfImages) % numOfImages;
};

/*
 * Rotates the array.
 * eg: [1, 2, 3, 4] => [2, 3, 4, 1]
 * if reverse: [1, 2, 3, 4] => [4, 1, 2, 3]
 */
// tslint:disable-next-line: no-any
export const manipulateArray = (arr: any[], reverse: boolean) => {
    let newArr = [...arr];
    if (reverse) {
        newArr.unshift(newArr.pop());
    } else {
        newArr.push(newArr.shift());
    }
    return newArr;
};

/*
 * Makes sure there are 3 elements in the array IF swipeable.
 *
 * length = 0: Return empty array
 * length = 1: Repeat the element as users see the 2nd element in the list.
 *             We dont need 3 elements as the list isnt swipeable if there are only 1 element.
 * length = 2: This is bit tricky. Repeat elements in the array and rotate once.
 *             This will make the 'state.current' go from 1 => 2 => 1, but list will have 4 elements.
 *             User will see 2 elements rotating.
 *
 * in any other case rotate the array once.
 */

// tslint:disable-next-line: no-any
export const initalizeImageArray = (items: any[]) => {
    let arr = [...items];

    if (arr.length === 0) {
        return [];
    } else if (arr.length === 1) {
        return [...arr, ...arr];
    } else if (arr.length === 2) {
        arr = [...arr, ...arr];
    }

    return manipulateArray(arr, true);
};