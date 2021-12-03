import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Spinner() {
  return <Loader type="TailSpin" color="fdc800" height={40} width={40} timeout={3000} />;
}

export default Spinner;
