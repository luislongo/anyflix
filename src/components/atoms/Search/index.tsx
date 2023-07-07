import React from 'react';

export interface SearchProps {
  defaultValue?: string;
  onSearchChange?: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({ defaultValue, onSearchChange }) => {
  return (
    <input
      type="text"
      className="
        appearance-none bg-transparent outline-none 
        border-0 border-b-2 
        w-96 h-10 px-4 placeholder:text-gray-300 
        hover:placeholder:text-gray-200 
        focus:placeholder:text-gray-200 
        text-gray-200 focus:border-0 focus:border-b-2
        border-b-primary-700 hover:border-primary-400 
        focus:ring-0 ring-0  focus:border-primary-400 transition-all placeholder:transition-all"
      onChange={(e) => {
        onSearchChange?.(e.target.value);
      }}
      defaultValue={defaultValue}
      placeholder="Search for a movie..."
      autoFocus
    />
  );
};
