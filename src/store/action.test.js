import {ActionType, ActionCreator} from './action';

describe(`Action creators work correctly`, () => {
  it(`Action creator for change genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GENRE_CHANGES,
      payload: `All genres`,
    };

    const genre = `All genres`;

    expect(ActionCreator.changeGenre(genre)).toEqual(expectedAction);
  });

  it(`Action creator for reset game returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_GENRES,
    };

    expect(ActionCreator.resetGenre()).toEqual(expectedAction);
  });

  it(`Action creator for reset loaded status returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_LOADED_STATUS,
    };

    expect(ActionCreator.resetLoadedStatus()).toEqual(expectedAction);
  });

  it(`Action creator for enable comment flag returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.ENABLE_COMMENT_FLAG,
    };

    expect(ActionCreator.enableCommentFlag()).toEqual(expectedAction);
  });

});
