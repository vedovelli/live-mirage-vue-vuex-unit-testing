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
    afterCreate(property, server) {
      const reviews = server.createList('review', randomNumber(45), { property });

      const reviewCount = reviews.length;

      const ratingSum = reviews.reduce((acc, review) => acc + review.rating, 0);

      const rating = Math.ceil(ratingSum / reviewCount);

      property.update({ reviewCount, rating });
    },
  }),
};
