import {findFilmById, conversionMinutes, convertSecondsForVideo, findRatingLevel} from './utils';
import {RatingLevels} from './const';

describe(`Helper function test`, () => {

  it(`findFilmById() should return movie with the desired шв `, () => {
    const films = [
      {id: 1, name: `Test1`},
      {id: 2, name: `Test2`},
      {id: 3, name: `Test3`},
      {id: 4, name: `Test4`}
    ];
    const id = 2;
    expect(findFilmById(films, id)).toEqual({id: 2, name: `Test2`});
  });

  it(`convertSecondsForVideo() should return time in format "hh:mm:ss" `, () => {
    const sec = 4235;
    expect(convertSecondsForVideo(sec)).toEqual(`1:10:35`);
  });

  it(`conversionMinutes() should return time in format "__h __m" `, () => {
    const mins = 131;
    expect(conversionMinutes(mins)).toEqual(`2h 11m`);
  });

  it(`findRatingLevel() should convert the rating from a numeric value to a string `, () => {
    const rating = 8;
    expect(findRatingLevel(rating)).toEqual(RatingLevels.VERY_GOOD);
  });
});
