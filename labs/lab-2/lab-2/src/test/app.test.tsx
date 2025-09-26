import { describe, expect, test, vi } from 'vitest';
import App from '../App';
import { render, screen } from '@testing-library/react';

/**
 * Needed by shadcn, not implemented by vitest
 */
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('App', () => {
  test('renders headline', () => {
    render(<App />);
    expect(screen.getByText('Min egen salladsbar')).toBeDefined();
  });
});
