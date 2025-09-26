import { describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import ViewCart from '@/view-cart';
import { Salad } from '@/salad';
import { inventory } from '@/inventory';

/**
 * Needed by shadcn, not implemented by vitest
 */
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const oneItemCart = [
  new Salad()
    .add('Sallad', inventory['Sallad'])
    .add('Kycklingfilé', inventory['Kycklingfilé'])
    .add('Bacon', inventory['Bacon'])
    .add('Krutonger', inventory['Krutonger'])
    .add('Parmesan', inventory['Parmesan'])
    .add('Ceasardressing', inventory['Ceasardressing']),
];
const threeItemCart = [
  ...oneItemCart,
  new Salad()
    .add('Sallad + Quinoa', inventory['Sallad + Quinoa'])
    .add('Kycklingfilé', inventory['Kycklingfilé'])
    .add('Cashewnötter', inventory['Cashewnötter'])
    .add('Fetaost', inventory['Fetaost'])
    .add('Ceasardressing', inventory['Ceasardressing']),
  new Salad()
    .add('Sallad', inventory['Sallad'])
    .add('Marinerad bönmix', inventory['Marinerad bönmix'])
    .add('Avocado', inventory['Avocado'])
    .add('Örtvinägrett', inventory['Örtvinägrett']),
];

const testData = [
  {
    label: 'empty cart',
    cart: [],
  },
  {
    label: 'one item cart',
    cart: oneItemCart,
  },
  {
    label: 'three item cart',
    cart: threeItemCart,
  },
];
testData.forEach((testCase) => {
  describe(testCase.label, () => {
    test('renders headline', () => {
      render(<ViewCart cart={[]} />);
      expect(screen.getByText('Varukorgen'));
      cleanup();
    });
    render(<ViewCart cart={testCase.cart} />);
    const cells = screen.getAllByRole('cell');
    test('right number of salads', () => {
      expect(cells.length).toBe(testCase.cart.length * 5 + 2);
    });
    testCase.cart.forEach((salad, index) => {
      test('list ingredients for salad ' + index, () => {
        within(cells[index * 5]).getByText(
          Object.getOwnPropertyNames(salad.ingredients).join(', ')
        );
      });
      test('price for salad ' + index, () => {
        within(cells[index * 5 + 4]).getByText(salad.price() + ' kr');
      });
      const info = salad.info();
      test(`vegan icon for salad ${index}`, () => {
        expect(!!cells[index * 5 + 1].children[0].children[0]).toBe(info.vegan);
      });
      test(`lactose icon for salad ${index}`, () => {
        expect(!!cells[index * 5 + 2].children[0].children[0]).toBe(
          info.lactose
        );
      });
      test(`gluten icon for salad ${index}`, () => {
        expect(!!cells[index * 5 + 3].children[0].children[0]).toBe(
          info.gluten
        );
      });
    });
    test('total price of cart', () => {
      const totalPrice = testCase.cart.reduce(
        (acc, salad) => acc + salad.price(),
        0
      );
      within(cells[cells.length - 1]).getByText(totalPrice + ' kr');
    });
    cleanup();
  });
});
