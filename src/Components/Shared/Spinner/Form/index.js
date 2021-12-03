import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Spinner() {
  return <Loader type="Oval" color="#FFFFFF" height={40} width={40} timeout={1000} />;
}

export default Spinner;
