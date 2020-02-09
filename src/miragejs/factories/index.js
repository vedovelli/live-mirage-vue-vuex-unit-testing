/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */

import user from './user';
import property from './property';
import review from './property';
import message from './message';

/*
 * factories are contained in a single object, that's why we
 * destructure what's coming from users and the same should
 * be done for all future factories
 */
export default {
  ...user,
  ...message,
  ...property,
  ...review,
};
