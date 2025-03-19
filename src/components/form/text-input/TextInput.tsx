import React, { useRef, useState } from 'react';
import './textInput.scss';

const TextInput = ({ type = 'text', placeholder, ...props }:
  { type?: string, placeholder?: string } & React.InputHTMLAttributes<HTMLInputElement>
  , ref: React.Ref<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`text-input`}
    onBlur={(e) => {
      setIsFocused(false);
      setHasText(inputRef?.current?.value !== '');
    }}
    >
      {placeholder && (
        <label 
          onClick={() => inputRef?.current?.focus()} 
          className={(isFocused || hasText) ? 'focused' : ''}
        >
          {placeholder}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasText(e.target.value !== '');
        }}
        {...props} // Permet d'injecter `register()`
      />
    </div>
  );
};

// Utilisation de forwardRef pour être compatible avec react-hook-form
export default React.forwardRef(TextInput);
