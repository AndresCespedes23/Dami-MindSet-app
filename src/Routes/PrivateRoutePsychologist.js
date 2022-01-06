import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setAuthentication } from 'redux/Auth/actions';

const PrivateRoutePsychologist = ({ component: RouteComponent, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token && userType === 'PSYCHOLOGIST') dispatch(setAuthentication());
  }, []);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        sessionStorage.getItem('token') && sessionStorage.getItem('userType') === 'PSYCHOLOGIST' ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/forbidden'} />
        )
      }
    />
  );
};

export default PrivateRoutePsychologist;
