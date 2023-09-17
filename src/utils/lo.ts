import * as _ from 'lodash';

export function omitNil(item) {
  return _.omitBy(item, _.isNil);
}

export const noop = _.noop;
export const first = _.first;
export const last = _.last;
export const omit = _.omit;
export const omitBy = _.omitBy;

export const isArray = _.isArray;
export const isObject = _.isObject;
export const isNull = _.isNull;
export const isNil = _.isNil;
export const isNumber = _.isNumber;
export const isEmpty = _.isEmpty;
export const isString = _.isString;
export const isUndefined = _.isUndefined;
export const isBoolean = _.isBoolean;


export const get = _.get;
export const clone = _.clone;
export const cloneDeep = _.cloneDeep;
export const toArray = _.toArray;

export const sortBy = _.sortBy;
export const orderBy = _.orderBy;
export const uniq = _.uniq;
export const uniqBy = _.uniqBy;


export const some = _.some;
export const every = _.every;
export const random = _.random;
export const shuffle = _.shuffle;
export const size = _.size;

export const throttle = _.throttle;
export const debounce = _.debounce;


export const camelCase = _.camelCase;
export const capitalize = _.capitalize;
export const kebabCase = _.kebabCase;
export const lowerCase = _.lowerCase;
export const snakeCase = _.snakeCase;
export const upperCase = _.upperCase;
export const upperFirst = _.upperFirst;

export const pad = _.pad;
export const padEnd = _.padEnd;
export const padStart = _.padStart;

export const parseInt = _.parseInt;
export const startsWith = _.startsWith;
export const endsWith = _.endsWith;

export const groupBy = _.groupBy;
