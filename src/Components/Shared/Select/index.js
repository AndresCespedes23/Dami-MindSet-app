import React from 'react';
import styles from './input.module.css';

function Select({ labelText, name, valueInput, errorMessage, error, onChange, disabled, options }) {
  return (
    <div>
      <label>{labelText}</label>
      <select name={name} value={valueInput} onChange={onChange} disabled={disabled}>
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
      {error && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default Select;
