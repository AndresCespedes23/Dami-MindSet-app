import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setAuthentication } from 'redux/Auth/actions';

const PrivateRouteAdmin = ({ component: RouteComponent, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token && userType === 'ADMIN') dispatch(setAuthentication());
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        sessionStorage.getItem('token') && sessionStorage.getItem('userType') === 'ADMIN' ? (
          <RouteComponent {...routeProps} />
        ) : sessionStorage.getItem('token') &&
          sessionStorage.getItem('userType') === 'CANDIDATE' ? (
          <Redirect to={'/postulants/home'} />
        ) : sessionStorage.getItem('token') &&
          sessionStorage.getItem('userType') === 'PSYCHOLOGIST' ? (
          <Redirect to={'/psychologist'} />
        ) : (
          <Redirect to={'/auth/sign'} />
        )
      }
    />
  );
};

export default PrivateRouteAdmin;
