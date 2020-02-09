/*
 * Mirage JS guide on Routes: https://miragejs.com/docs/route-handlers/functions
 */

export default function routes() {
  this.namespace = 'api';

  /*
   * A resource comprises all operations for a CRUD
   * operation. .get(), .post(), .put() and delete().
   * Mirage JS guide on Resource: https://miragejs.com/docs/route-handlers/shorthands#resource-helper
   */
  this.resource('users');
  this.resource('products');
  this.resource('properties');

  this.get('properties', schema => {
    const newProperties = schema.properties
      .all()
      .filter(property => property.new === 'true')
      .sort((a, b) => b.rating - a.rating);

    const regularProperties = schema.properties
      .all()
      .filter(property => property.new === 'false')
      .sort((a, b) => b.rating - a.rating);

    return newProperties.mergeCollection(regularProperties);
  });

  this.get('reviews', (schema, request) => {
    const propertyId = request.queryParams.propertyId;
    return schema.reviews.where({ propertyId });
  });

  /*
   * From your component use fetch('api/messages?userId=<a user id>')
   * replacing <a user id> with a real ID
   */
  this.get('messages', (schema, request) => {
    const {
      queryParams: { userId },
    } = request;

    return schema.messages.where({ userId });
  });
}
