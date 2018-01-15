// import { Action } from '@ngrx/store';
import { Book } from '../models/book';

export type BookActions =
  | { type: 'BOOKS_SEARCH'; payload: string }
  | { type: 'BOOKS_SEARCH_COMPLETE'; payload: Book[] }
  | { type: 'BOOKS_SEARCH_ERROR'; payload: string }
  | { type: 'BOOKS_LOAD'; payload: Book }
  | { type: 'BOOKS_SELECT'; payload: string };

// export enum BookActionTypes {
//   Search = '[Book] Search',
//   SearchComplete = '[Book] Search Complete',
//   SearchError = '[Book] Search Error',
//   Load = '[Book] Load',
//   Select = '[Book] Select',
// }

// /**
//  * Every action is comprised of at least a type and an optional
//  * payload. Expressing actions as classes enables powerful
//  * type checking in reducer functions.
//  *
//  * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
//  */
// export class Search implements Action {
//   readonly type = BookActionTypes.Search;

//   constructor(public payload: string) {}
// }

// export class SearchComplete implements Action {
//   readonly type = BookActionTypes.SearchComplete;

//   constructor(public payload: Book[]) {}
// }

// export class SearchError implements Action {
//   readonly type = BookActionTypes.SearchError;

//   constructor(public payload: string) {}
// }

// export class Load implements Action {
//   readonly type = BookActionTypes.Load;

//   constructor(public payload: Book) {}
// }

// export class Select implements Action {
//   readonly type = BookActionTypes.Select;

//   constructor(public payload: string) {}
// }

// /**
//  * Export a type alias of all actions in this action group
//  * so that reducers can easily compose action types
//  */
// export type BookActions = Search | SearchComplete | SearchError | Load | Select;
