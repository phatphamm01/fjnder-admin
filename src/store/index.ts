type Set<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined,
) => void;

type Get<T> = () => T;

type SetAction<T, Name extends string> = {
  [K in keyof T as K extends `${infer I}` ? `${Name}${Capitalize<I>}` : K]: (
    params: T[K],
  ) => void;
};

export type IStore<T extends Record<string, any> = {}> = {
  [K in keyof T]: T[K];
} & SetAction<T, 'set'>;
