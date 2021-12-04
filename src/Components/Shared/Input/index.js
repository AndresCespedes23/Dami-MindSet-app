import React from 'react';
import styles from './input.module.css';

function Input({ labelText, name, type, value, errorMessage, error, onChange, disbled }) {
  return (
    <div>
      <label>{labelText}</label>
      <input name={name} type={type} value={value} onChange={onChange} disabled={disbled}></input>
      {error && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
}

export default Input;
