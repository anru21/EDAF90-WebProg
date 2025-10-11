import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import { test, expect, vi, beforeAll, afterAll } from 'vitest';
import App from '@/App';
import ViewCart from '@/view-cart';

/**
 * Needed by shadcn, not implemented by vitest
 */
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

let originalLocalGetItem = Storage.prototype.getItem;

beforeAll(() => {
  originalLocalGetItem = Storage.prototype.getItem;
  Storage.prototype.getItem = function getItem(key: string) {
    if (key.startsWith('remix')) {
      return null;
    }
    return `[
  {"ingredients":{"Sallad":{"price":10,"type":"foundation","vegan":true},"Marinerad bönmix":{"price":10,"type":"protein","vegan":true},"Avocado":{"price":10,"type":"extra","vegan":true},"Lime":{"price":5,"type":"extra","vegan":true},"Örtvinägrett":{"price":5,"type":"dressing","vegan":true}},"uuid":"fecdbd88-4591-4643-ae78-cfabd0d32894"},
  {"ingredients":{"Pasta":{"price":10,"type":"foundation","gluten":true},"Handskalade räkor från Smögen":{"price":40,"type":"protein"},"Avocado":{"price":10,"type":"extra","vegan":true},"Chèvreost":{"price":15,"type":"extra","lactose":true},"Rostad aioli":{"price":5,"type":"dressing"}},"uuid":"a55bc04f-3563-42bd-a82e-bfa2e854bd30"}
  ]`;
  };
});

test('initialise cart from localStorage', () => {
  const routerConfig = [
    {
      Component: App,
      children: [
        {
          path: 'view-cart',
          Component: ViewCart,
        },
      ],
    },
  ];
  const Stub = createRoutesStub(routerConfig);
  render(<Stub initialEntries={['/view-cart']} />);
  const cells = screen.getAllByRole('cell');
  // cart table has 2 salad rows
  expect(cells.length).toBe(2 * 5 + 2);
});

afterAll(() => {
  Storage.prototype.getItem = originalLocalGetItem;
});
