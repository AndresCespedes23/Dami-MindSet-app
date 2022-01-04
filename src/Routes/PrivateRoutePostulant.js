import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setAuthentication } from 'redux/Auth/actions';

const PrivateRoutePostulant = ({ component: RouteComponent, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token && userType === 'CANDIDATE') dispatch(setAuthentication());
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        sessionStorage.getItem('token') && sessionStorage.getItem('userType') === 'CANDIDATE' ? (
          <RouteComponent {...routeProps} />
        ) : sessionStorage.getItem('token') && sessionStorage.getItem('userType') === 'ADMIN' ? (
          <Redirect to={'/admin'} />
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

export default PrivateRoutePostulant;
