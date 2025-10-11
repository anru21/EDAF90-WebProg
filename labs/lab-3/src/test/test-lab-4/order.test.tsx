import { createRoutesStub } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
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
let originalFetch = global.fetch;
let postCount = 0;
let lastPost: any;

beforeAll(() => {
  global.fetch = vi.fn((url, init?) => {
    if (init?.method === 'POST') {
      postCount++;
      lastPost = JSON.parse(init?.body || '');
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            '{"status": "confirmed","timestamp": "2025-10-10T14:35:55.629Z","uuid": "20727310-855a-4f5a-88aa-4e06832a774c","price": 210,"order": []}'
          ),
      }) as any;
    }
    return originalFetch(url, init);
  });

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

test('order salad', () => {
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
  fireEvent.click(screen.getByRole('button', { name: 'Skicka beställningen' }));
  expect(lastPost).toStrictEqual([
    ['Sallad', 'Marinerad bönmix', 'Avocado', 'Lime', 'Örtvinägrett'],
    [
      'Pasta',
      'Handskalade räkor från Smögen',
      'Avocado',
      'Chèvreost',
      'Rostad aioli',
    ],
  ]);
});

afterAll(() => {
  global.fetch = originalFetch;
  Storage.prototype.getItem = originalLocalGetItem;
});
