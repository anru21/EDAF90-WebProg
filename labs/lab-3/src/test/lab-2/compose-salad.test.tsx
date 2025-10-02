import { describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { inventory } from '@/inventory';
import ComposeSalad from '@/compose-salad';

/**
 * Needed by shadcn, not implemented by vitest
 */
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const addToCart = vi.fn();
describe('compose salad form', () => {
  test('renders all extras', () => {
    render(<ComposeSalad inventory={inventory} addToCart={addToCart} />);
    Object.entries(inventory)
      .filter(([_, info]) => info.type === 'extra')
      .forEach(([name, info]) => {
        screen.getByLabelText(`${name}, ${info.price} kr`);
      });
    cleanup();
  });
  test('order salad', () => {
    render(<ComposeSalad inventory={inventory} addToCart={addToCart} />);
    const foundation = /Sallad \+ Glasnudlar/i;
    const protein = /Norsk fjordlax/i;
    const dressing = /Kimchimayo/i;
    const selectedExtras = [/Avocado/i, /Oliver/i];
    for (const name of selectedExtras) {
      fireEvent.click(screen.getByLabelText(name));
    }
    // test de-selecting an extra
    fireEvent.click(screen.getByLabelText(/Parmesan/i));
    fireEvent.click(screen.getByLabelText(/Parmesan/i));

    const selectButtons = screen.queryAllByRole('combobox');
    expect(selectButtons.length).toBe(3);

    fireEvent.click(selectButtons[0]);
    fireEvent.click(
      screen.getByText(foundation, {
        ignore: 'option, script, style',
      })
    );

    fireEvent.click(selectButtons[1]);
    fireEvent.click(
      screen.getByText(protein, {
        ignore: 'option, script, style',
      })
    );

    fireEvent.click(selectButtons[2]);
    fireEvent.click(
      screen.getByText(dressing, {
        ignore: 'option, script, style',
      })
    );

    const ingredients = {
      Avocado: {
        price: 10,
        type: 'extra',
        vegan: true,
      },
      Kimchimayo: {
        price: 5,
        type: 'dressing',
      },
      'Norsk fjordlax': {
        price: 30,
        type: 'protein',
      },
      Oliver: {
        price: 5,
        type: 'extra',
        vegan: true,
      },
      'Sallad + Glasnudlar': {
        gluten: true,
        price: 10,
        type: 'foundation',
      },
    };
    fireEvent.click(screen.getByText(/Lägg till i varukorgen/i));
    expect(addToCart).toBeCalledTimes(1);
    expect(addToCart.mock.lastCall?.[0].ingredients).toStrictEqual(ingredients);
    // check that the form is cleared
    for (const name of selectedExtras) {
      expect(
        screen.getByLabelText(name)['ariaChecked'],
        'clear form after submission'
      ).toBe('false');
    }
    for (const name of [foundation, protein, dressing]) {
      const elem = screen.getByText(name, {
        ignore: 'span, script, style',
      }) as any;
      expect(elem.selected, 'clear form after submission').toBe(false);
    }
    cleanup();
  });
});
