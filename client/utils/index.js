import { getUserToken, isLoggedIn, removeUserToken, setUserToken, } from './auth';
import { doesGuestOrderExit, getGuestOrderId, removeGuestOrderId, setGuestOrderId } from './guest-order';

export {
  isLoggedIn,
  getUserToken,
  setUserToken,
  removeUserToken,
  doesGuestOrderExit,
  getGuestOrderId,
  setGuestOrderId,
  removeGuestOrderId
};
