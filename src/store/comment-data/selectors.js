import {NameSpace} from '../root-reducer';

export const getSelectedComments = (state) => state[NameSpace.COMMENT_DATA].selectedComments;
export const getSentCommentStatus = (state) => state[NameSpace.COMMENT_DATA].isSentComment;
