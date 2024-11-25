// Import from '@testing-library/react' and '@testing-library/user-event'
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom'; // This adds the custom matchers like toBeInTheDocument

import { ParameterSlider } from '@/components/controls/parameter-slider';

// Add proper types for the mock function
const mockOnChange = jest.fn() as jest.MockedFunction<(value: number) => void>;

describe('ParameterSlider', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with correct label and value', () => {
    render(
      <ParameterSlider
        label="Temperature"
        value={0.7}
        onChange={mockOnChange}
        min={0}
        max={1}
        step={0.1}
      />
    );

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('0.7')).toBeInTheDocument();
  });

  it('calls onChange when slider value changes', () => {
    render(
      <ParameterSlider
        label="Temperature"
        value={0.7}
        onChange={mockOnChange}
        min={0}
        max={1}
        step={0.1}
      />
    );

    const slider = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '0.8' } });

    expect(mockOnChange).toHaveBeenCalledWith(0.8);
  });
});
