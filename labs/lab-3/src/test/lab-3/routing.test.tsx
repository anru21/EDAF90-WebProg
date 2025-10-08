import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

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

describe('routing test', () => {
  test('check home', () => {
    const Stub = createRoutesStub(routerConfig);
    render(<Stub initialEntries={['/']} />);
    expect(screen.getByText('Welcome')).toBeDefined();
  });

  test('check compose-salad', () => {
    const Stub = createRoutesStub(routerConfig);
    render(<Stub initialEntries={['/compose-salad']} />);
    expect(screen.getByText('Komponera en sallad')).toBeDefined();
  });

  test('check view-cart', () => {
    const Stub = createRoutesStub(routerConfig);
    render(<Stub initialEntries={['/view-cart']} />);
    expect(screen.getAllByText('Varukorgen').length).toBe(2);
  });

  test('check page not found', () => {
    const Stub = createRoutesStub(routerConfig);
    render(<Stub initialEntries={['/bad-url']} />);
    expect(screen.getByText(/not found/i)).toBeDefined();
  });
});
