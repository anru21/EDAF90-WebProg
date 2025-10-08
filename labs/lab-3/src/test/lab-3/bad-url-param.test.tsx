import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';

import routerConfig from '@/router-config';

/**
 * Needed by shadcn, not implemented by vitest
 */
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

test('bad url param', () => {
  const Stub = createRoutesStub(routerConfig);
  render(<Stub initialEntries={['/view-cart/salad/invalid-uuid']} />);
  // cart is rendered
  expect(screen.getAllByText('Varukorgen').length).toBe(2);
  const cells = screen.getAllByRole('cell');
  // cart table has 3 salad rows
  expect(cells.length).toBe(3 * 5 + 2);
  // new salad confirm alert is not rendered
  expect(
    screen.queryByText('En ny sallad har lagts till i varukorgen.')
  ).toBeNull();
  expect(screen.queryByText('Ny')).toBeNull();
});
