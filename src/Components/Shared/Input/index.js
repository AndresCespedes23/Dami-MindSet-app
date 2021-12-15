import React from 'react';
import styles from './input.module.css';

function Input({
  labelText,
  name,
  typeInput,
  valueInput,
  errorMessage,
  error,
  inputOnChange,
  disabled
}) {
  return (
    <div>
      <label>{labelText}</label>
      <input
        name={name}
        type={typeInput}
        value={valueInput}
        onChange={inputOnChange}
        disabled={disabled}
      ></input>
      {error && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default Input;
