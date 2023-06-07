const doesGuestOrderExit = () => {
  const orderId = window.localStorage.getItem('GUEST_ORDER');
  return !!orderId;
};

const getGuestOrderId = () => window.localStorage.getItem('GUEST_ORDER');

const setGuestOrderId = (orderId) =>
  window.localStorage.setItem('GUEST_ORDER', orderId);

const removeGuestOrderId = () => {
  window.localStorage.removeItem('GUEST_ORDER');
};

export {
  doesGuestOrderExit,
  getGuestOrderId,
  setGuestOrderId,
  removeGuestOrderId
};