import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Spinner() {
  return <Loader type="ThreeDots" color="#002147" height={80} width={80} />;
}

export default Spinner;
