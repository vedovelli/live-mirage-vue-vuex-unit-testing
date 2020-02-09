import { Factory } from 'miragejs';
import faker from 'faker';
import { randomNumber } from './utils';

export default {
  review: Factory.extend({
    content() {
      return faker.fake('{{lorem.paragraph}}');
    },
    user() {
      return faker.fake('{{name.findName}}');
    },
    rating() {
      return randomNumber(5);
    },
    date() {
      const date = new Date(faker.fake('{{date.past}}'));
      return date.toLocaleDateString();
    },
  }),
};
