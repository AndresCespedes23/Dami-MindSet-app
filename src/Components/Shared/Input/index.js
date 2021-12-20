import React from 'react';
import styles from './input.module.css';

function Input(props) {
  const hasError = !!(props.meta.touched && props.meta.error);

  return (
    <div>
      <label>{props.label}</label>
      <input disabled={props.disabled} placeholder={props.placeholder} {...props.input} />
      {hasError && <span className={styles.error}>{props.meta.touched && props.meta.error}</span>}
    </div>
  );
}
export default Input;
