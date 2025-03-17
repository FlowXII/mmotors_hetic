import React, { useRef, useState } from 'react';
import './textInput.scss';

const TextInput = ({ type = 'text', placeholder, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  return (
    <div className={`text-input`}>
      {placeholder && (
        <label 
          onClick={() => ref?.current?.focus()} 
          className={(isFocused || hasText) ? 'focused' : ''}
        >
          {placeholder}
        </label>
      )}
      <input
        ref={ref}
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
