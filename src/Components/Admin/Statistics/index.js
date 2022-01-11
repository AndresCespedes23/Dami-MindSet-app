import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './statistics.module.css';
import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';
import { getQuantityStatistics } from 'redux/Statistics/thunks';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';

function Admins() {
  const isLoading = useSelector((state) => state.statistics.isLoading);
  const quantities = useSelector((state) => state.statistics.data);
  const dispatch = useDispatch();
  const history = useHistory();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Quantities'
      }
    }
  };
  const labels = [
    'Admins',
    'Applications',
    'Clients',
    'Interviews',
    'Positions',
    'Postulants',
    'Profiles',
    'Psychologists',
    'Sessions'
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Quantity',
        data: [
          quantities.admins,
          quantities.applications,
          quantities.clients,
          quantities.interviews,
          quantities.positions,
          quantities.candidates,
          quantities.profiles,
          quantities.psychologists,
          quantities.sessions
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(245, 255, 145, 0.8)',
          'rgba(80, 255, 145, 0.8)',
          'rgba(80, 47, 145, 0.8)',
          'rgba(80, 47, 0, 0.8)',
          'rgba(255, 158, 0, 0.8)',
          'rgba(92, 158, 255, 0.8)',
          'rgba(92, 255, 255, 0.8)',
          'rgba(255, 30, 0, 0.8)'
        ]
      }
    ]
  };

  useEffect(() => {
    dispatch(getQuantityStatistics());
  }, [dispatch]);
  const handleBackClick = () => {
    history.push('/admin/home');
  };
  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <Button type={'backBtnAdmin'} onClick={handleBackClick} />
          <h2>Statistics</h2>
        </div>
        <div className={styles.contentPsychologists}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </section>
  );
}

export default Admins;
