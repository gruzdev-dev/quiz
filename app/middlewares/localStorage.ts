import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux'

export const localStorageMiddleware: Middleware =
  ({ getState }: MiddlewareAPI) =>
    (next: Dispatch) => (action: AnyAction) => {
      localStorage.setItem('state', JSON.stringify(getState()))
      return next(action)
    }