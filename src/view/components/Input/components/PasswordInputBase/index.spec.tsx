import { fireEvent, render, screen } from '@testing-library/react';

import { PasswordInputBase } from '@view/components/Input';
import faker from 'faker';

const makeComponent = (fieldName: string, fieldLabel: string): void => {
  render(<PasswordInputBase name={fieldName} label={fieldLabel} />);
};

describe('Password Input Component', () => {
  test('Should begin with type password', () => {
    const fieldName = faker.database.column();
    const fieldLabel = faker.name.title();

    makeComponent(fieldName, fieldLabel);

    const input = screen.getByTestId(fieldName) as HTMLInputElement;

    expect(input.type).toEqual('password');
  });

  test('should click password icon and show password', () => {
    const fieldName = faker.database.column();
    const fieldLabel = faker.name.title();

    makeComponent(fieldName, fieldLabel);

    const iconPassword = screen.getByTestId(
      `${fieldName}-icon-password`,
    ) as HTMLInputElement;

    fireEvent.mouseDown(iconPassword);

    const input = screen.getByTestId(fieldName) as HTMLInputElement;
    expect(input.type).toEqual('text');
  });
});
