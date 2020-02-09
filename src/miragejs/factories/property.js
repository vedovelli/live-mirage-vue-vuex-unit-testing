import { Factory } from 'miragejs';
import faker from 'faker';
import { randomNumber } from './utils';

export default {
  property: Factory.extend({
    new() {
      return faker.fake('{{random.boolean}}');
    },
    beds() {
      return randomNumber(4);
    },
    baths() {
      return randomNumber(3);
    },
    title() {
      return faker.fake('{{lorem.words}}');
    },
    formattedPrice() {
      return faker.fake('{{finance.amount}}');
    },
    rating() {
      return randomNumber(5);
    },
    afterCreate(property, server) {
      const reviews = server.createList('review', randomNumber(45), { property });

      const reviewCount = reviews.length;

      property.update({ reviewCount });
    },
  }),
};
