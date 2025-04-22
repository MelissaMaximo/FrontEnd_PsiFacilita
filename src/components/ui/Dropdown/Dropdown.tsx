import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  closeOnSelect?: boolean;
  noOptionsMessage?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
  disabled = false,
  multiple = false,
  searchable = false,
  className = '',
  style,
  closeOnSelect = true,
  noOptionsMessage = 'Sem opções disponíveis',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  };

  const handleOptionSelect = (selectedValue: string | number) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(selectedValue)
        ? currentValues.filter(v => v !== selectedValue)
        : [...currentValues, selectedValue];
      onChange(newValue);
    } else {
      onChange(selectedValue);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        handleToggleDropdown();
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          Math.min(prev + 1, filteredOptions.length - 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex].value);
        }
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayValue = () => {
    if (!value || (multiple && (value as Array<string | number>).length === 0)) {
      return placeholder;
    }

    if (multiple) {
      const selectedOptions = options.filter(option => 
        (value as Array<string | number>).includes(option.value)
      );
      return selectedOptions.map(option => option.label).join(', ');
    }

    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const isOptionSelected = (optionValue: string | number) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      style={style}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-disabled={disabled}
    >
      <div
        className={`flex items-center justify-between p-2 border rounded cursor-pointer ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-500'
        } ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}`}
        onClick={handleToggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={`truncate ${!value ? 'text-gray-400' : ''}`}>
          {getDisplayValue()}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {searchable && (
            <div className="p-2 border-b">
              <input
                type="text"
                className="w-full p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <ul
            className="py-1 overflow-auto max-h-60"
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">{noOptionsMessage}</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer ${
                    highlightedIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'
                  } ${
                    isOptionSelected(option.value)
                      ? 'bg-blue-50 text-blue-700'
                      : ''
                  }`}
                  onClick={() => handleOptionSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  role="option"
                  aria-selected={isOptionSelected(option.value)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isOptionSelected(option.value)}
                      readOnly
                      className="mr-2"
                    />
                  )}
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;