import { TEST_ADMIN } from '../../constants/actionTypes';

export const testAdmin = (test) => ({
  type: TEST_ADMIN,
  test
});
