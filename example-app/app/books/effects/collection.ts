import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { Book } from '../models/book';
import { switchMap, toArray, map, catchError, mergeMap } from 'rxjs/operators';

import { choose } from '../../lib';
import { CollectionActions } from '../actions/collection';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  loadCollection$: Observable<Action> = this.actions$.pipe(
    choose(a => a.type === 'COLLECTION_LOAD'),
    switchMap(() =>
      this.db.query('books').pipe(
        toArray(),
        map(
          (books: Book[]) =>
            <CollectionActions>{
              type: 'COLLECTION_LOAD_SUCCESS',
              payload: books,
            }
        ),
        catchError(error =>
          of(<CollectionActions>{
            type: 'COLLECTION_LOAD_FAIL',
            payload: error,
          })
        )
      )
    )
  );

  @Effect()
  addBookToCollection$: Observable<Action> = this.actions$.pipe(
    choose(a => (a.type === 'COLLECTION_ADD_BOOK' ? a.payload : null)),
    mergeMap(book =>
      this.db.insert('books', [book]).pipe(
        map(
          () =>
            <CollectionActions>{
              type: 'COLLECTION_ADD_BOOK_SUCCESS',
              payload: book,
            }
        ),
        catchError(() =>
          of(<CollectionActions>{
            type: 'COLLECTION_ADD_BOOK_FAIL',
            payload: book,
          })
        )
      )
    )
  );

  @Effect()
  removeBookFromCollection$: Observable<Action> = this.actions$.pipe(
    choose(a => (a.type === 'COLLECTION_REMOVE_BOOK' ? a.payload : null)),
    mergeMap(book =>
      this.db.executeWrite('books', 'delete', [book.id]).pipe(
        map(
          () =>
            <CollectionActions>{
              type: 'COLLECTION_REMOVE_BOOK_SUCCESS',
              payload: book,
            }
        ),
        catchError(() =>
          of(<CollectionActions>{
            type: 'COLLECTION_ADD_BOOK_FAIL',
            payload: book,
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions<CollectionActions>,
    private db: Database
  ) {}
}
