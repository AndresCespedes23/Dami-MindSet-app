import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './spinner.module.css';

function Spinner({ type, color, height, width, timeout, text }) {
  return (
    <div className={styles.container}>
      <Loader type={type} color={color} height={height} width={width} timeout={timeout} />
      <div>{text}</div>
    </div>
  );
}

export default Spinner;
