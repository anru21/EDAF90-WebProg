import { createRoutesStub } from 'react-router';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('form validation and submit confirmation', () => {
  const Stub = createRoutesStub(routerConfig);
  render(<Stub initialEntries={['/compose-salad']} />);
  fireEvent.click(
    screen.getByRole('button', { name: 'Lägg till i varukorgen' })
  );
  // invalid form fields: foundation, protein, and dressing
  expect(screen.getAllByText(/Gör ett val./i).length).toBe(3);
  // extras are invalid
  expect(screen.getAllByText(/välj minst två./i).length).toBeDefined();
  const selectButtons = screen.queryAllByRole('combobox');
  const foundation = /Sallad \+ Glasnudlar/i;
  const protein = /Norsk fjordlax/i;
  const dressing = /Kimchimayo/i;
  const selectedExtras = [/Avocado/i, /Oliver/i];

  for (const name of selectedExtras) {
    fireEvent.click(screen.getByLabelText(name));
  }
  // extra error is cleared once two extras have been selected
  expect(screen.queryByText(/ välj minst två./i)).toBeNull();

  fireEvent.click(selectButtons[0]);
  fireEvent.click(
    screen.getByText(foundation, {
      ignore: 'option, script, style',
    })
  );
  // foundation error is cleared, protein and dressing are invalid
  expect(screen.getAllByText(/Gör ett val./i).length).toBe(2);

  fireEvent.click(selectButtons[1]);
  fireEvent.click(
    screen.getByText(protein, {
      ignore: 'option, script, style',
    })
  );
  // protein error is cleared, dressing is invalid
  expect(screen.getByText(/Gör ett val./i)).toBeDefined();

  fireEvent.click(selectButtons[2]);
  fireEvent.click(
    screen.getByText(dressing, {
      ignore: 'option, script, style',
    })
  );
  // dressing error is cleared, all selects are valid
  expect(screen.queryByText(/Gör ett val./i)).toBeNull();

  //    const ingredients =
  //      'Avocado, Kimchimayo, Norsk fjordlax, Oliver, Sallad + Glasnudlar';
  fireEvent.click(
    screen.getByRole('button', { name: /Lägg till i varukorgen/i })
  );
  // navigated to view-cart page
  expect(screen.getAllByText('Varukorgen').length).toBe(2);
  const cells = screen.getAllByRole('cell');
  // cart table has 4 salad rows
  expect(cells.length).toBe(4 * 5 + 2);
  // renders the confirm alert
  expect(
    screen.getByText('En ny sallad har lagts till i varukorgen.')
  ).toBeDefined();
  expect(screen.getByText('Ny')).toBeDefined();
});
