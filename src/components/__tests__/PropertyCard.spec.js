import PropertyCard from '@/components/PropertyCard';
import { render, fireEvent, waitForElement, wait } from '@testing-library/vue';
import { makeServer } from '@/miragejs/server';

let server;
let property;

beforeEach(() => {
  server = makeServer({ environment: 'test' });
  property = server.create('property');
});

afterEach(() => {
  server.shutdown();
  property = null;
});

describe('PropertyCard', () => {
  it('renders the component without errors', async () => {
    const { queryByTestId } = render(PropertyCard, { props: { property } });

    await wait(() => queryByTestId('property-wrapper'));

    expect(queryByTestId('property-wrapper')).toBeDefined();
  });

  it('renders reviews when card gets clicked', async () => {
    const { queryByTestId, getAllByTestId } = render(PropertyCard, { props: { property } });

    const card = await waitForElement(() => queryByTestId('property-wrapper'));

    fireEvent.click(card);

    const renderedReviews = await waitForElement(() => getAllByTestId('review'));

    expect(renderedReviews.length).toBeGreaterThan(0);

    expect(renderedReviews.length).toBe(property.reviews.length);
  });

  it('doesn not render reviews when card gets clicked a second time', async () => {
    const { queryByTestId, queryAllByTestId } = render(PropertyCard, { props: { property } });

    const card = await waitForElement(() => queryByTestId('property-wrapper'));

    fireEvent.click(card);

    await wait(() => queryAllByTestId('review'));

    fireEvent.click(card);

    const renderedReviews = await waitForElement(() => queryAllByTestId('review'));

    expect(renderedReviews.length).toBe(0);
  });

  it('doesn not render reviews when card gets clicked a second time', async () => {
    const { queryByTestId, getByTestId, queryAllByTestId } = render(PropertyCard, {
      props: { property },
    });

    const card = await waitForElement(() => queryByTestId('property-wrapper'));

    fireEvent.click(card);

    await wait(() => getByTestId('loading'));

    expect(getByTestId('loading')).toBeDefined();

    await wait(() => queryAllByTestId('review'));

    expect(queryByTestId('loading')).toBeNull();
  });
});
