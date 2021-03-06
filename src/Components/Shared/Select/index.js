import React from 'react';
import styles from './select.module.css';

function Select(props) {
  const hasError = !!(props.meta.touched && props.meta.error);
  return (
    <div>
      <label>{props.label}</label>
      <select disabled={props.disabled} {...props.input} value={props.selectedValue}>
        <option value={''} disabled>
          Select one
        </option>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {hasError && <span className={styles.error}>{props.meta.touched && props.meta.error}</span>}
    </div>
  );
}
export default Select;
