import { render, waitForElement, wait } from '@testing-library/vue';
import Properties from '@/views/Properties';
import { makeServer } from '@/miragejs/server';
import { Response } from 'miragejs';

let server;

beforeEach(() => (server = makeServer({ environment: 'test' })));

afterEach(() => server.shutdown());

describe('Properties.vue', () => {
  it('renders 3 PropertyCards when API delivers 3 property objects', async () => {
    server.createList('property', 3);

    const { getAllByTestId } = render(Properties);
    const properties = await waitForElement(() => getAllByTestId('property'));

    expect(properties.length).toBe(3);
  });

  it('renders no PropertyCards when API returns error 500', async () => {
    server.get('properties', () => new Response(500, {}, 'Server is down'));

    const { queryAllByTestId, queryByTestId } = render(Properties);
    await wait(() => queryAllByTestId('property'));

    expect(queryAllByTestId('property')).toHaveLength(0);
    expect(queryByTestId('error')).toBeDefined();
  });
});
