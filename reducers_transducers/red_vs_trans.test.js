//base on http://maksimivanov.com/posts/reducers-vs-transducers

import assert from 'assert';

describe('Reducers vs transducers', function () {
  it('reducer tests', function () {

    const numbers = [1, 2, 3, 14, 21];

    const biggestNumber = numbers.reduce(
        (accumulator, value) => Math.max(accumulator, value)
    );

    assert.equal(21, biggestNumber);

    const folders = ['usr', 'var', 'bin'];

    const path = folders.reduce(
       (accumulator, value) => `${accumulator}/${value}`, '');

    assert.equal('/usr/var/bin', path);


    const arr = [1, 2, 3, 4, 5, 6].filter((x) => x % 2 === 0).map((x) => x * 2);
    assert.deepEqual([4, 8, 12], arr);
    console.info(arr);


    const myfilter = (predicate) => {
      return (acc, value) => {
        if(predicate(value)){
          acc.push(value);
        }
        return acc;
    }
  }

  const mymap = (transformer) => {
    return (acc, value) => {
      acc.push(transformer(value));
      return acc;
    }
  }

  const arr2 = [1, 2, 3, 4, 5, 6].reduce(myfilter((x) => x % 2 === 0), []).reduce(mymap((x) => x * 2), []);
  assert.deepEqual([4, 8, 12], arr2);
  console.info(arr2);
  });

/**
 * This pattern where we take a reducer as an argument and return another reducer is called transducer.
 * As it’s a combination of transformer and reducer (we take a reducer and transform it).
 *
 * const transducer => (reducer) => {
 *   return (accumulator, value) => {
 *      //Some logic involving passed in reducer
 *   }
 * }
 * So basically transducer looks like this (oneReducer) => anotherReducer.
 */
  it('transducer test', function () {
    const myfilter = (predicate) => (reducer) => {
      return (accumulator, value) => {
        if(predicate(value)){
          return reducer(accumulator, value);
        }
        return accumulator;
      }
    }

    const mymap = transformer => reducer => {
      return (accumulator, value) => {
        return reducer(accumulator, transformer(value));
      };
    };

    const finalReducer = (acc, val) => {
      acc.push(val);
      return acc;
    };

    const evenPredicate = (x) => x % 2 === 0;
    const doubleTransformer = (x) => x * 2;

    const filterEven = myfilter(evenPredicate);
    const mapDouble = mymap(doubleTransformer);

    const result =  [1, 2, 3, 4, 5, 6].reduce(filterEven(mapDouble(finalReducer)), []);
    assert.deepEqual([4, 8, 12], result);

    });
  });