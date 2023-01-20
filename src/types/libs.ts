import {
  AsyncFunction,
  AsyncReturnType,
} from 'type-fest/source/async-return-type';

export type ReactRouterActionResponse<
  ReactRouterLoaderOrActionFunctionType extends AsyncFunction,
> =
  | Exclude<AsyncReturnType<ReactRouterLoaderOrActionFunctionType>, Response>
  | undefined;
