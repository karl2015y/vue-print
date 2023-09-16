import { purry, identity, isNumber, isString } from "remeda";

type Pair<T, K> = [(value: T) => boolean, (value: T) => K];

function _cond<T, K>(value: T, pairs: Array<Pair<T, K>>) {
  for (const [predicate, func] of pairs) {
    if (predicate(value)) {
      return func(value);
    }
  }
  return undefined;
}

/** 功能與 ramda cond 相同，但是型別推導效果更好 */
export function cond<T, K>(value: T, pairs: Array<Pair<T, K>>): K | undefined;
export function cond<T, K>(pairs: Array<Pair<T, K>>): (value: T) => K | undefined;
export function cond() {
  // eslint-disable-next-line prefer-rest-params
  return purry(_cond, arguments);
}
