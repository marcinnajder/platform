import { LayoutActions2 } from '../actions/layout';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(
  state: State = initialState,
  action: LayoutActions2
): State {
  switch (action.type) {
    case 'LAYOUT_CLOSE_SIDENAV':
      return {
        showSidenav: false,
      };

    case 'LAYOUT_OPEN_SIDENAV':
      return {
        showSidenav: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
