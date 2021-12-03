import styles from './input.module.css';

function Input(props) {
  return (
    <div className={styles.containerInput}>
      <label className={styles.label}>{props.id}</label>
      <input
        className={styles.input}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.data}
      ></input>
      {props.error && <span className={styles[props.style]}>{props.message}</span>}
    </div>
  );
}

export default Input;
