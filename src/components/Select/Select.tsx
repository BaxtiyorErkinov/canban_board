import React from 'react';

type SelectProps = React.ComponentPropsWithRef<'select'> & {
  options: {
    title: string;
    value: number;
  }[];
};

export const Select: React.FC<SelectProps> = React.forwardRef(
  ({ options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className="bg-dark-400 border border-dark-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
        {...props}>
        {options.map((option) => (
          <>
            <option value={option.value} key={option.value}>
              {option.title}
            </option>
          </>
        ))}
      </select>
    );
  },
);
