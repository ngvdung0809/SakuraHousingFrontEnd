/* eslint-disable camelcase */
/* eslint-disable radix */

const api = (config) => ({
  loginApi: ({ username, password }) => config('post', '/auth/v1/login/', {
    username,
    password,
  }),
  getProfile: (tokenUser) => config('get', '/account/v1/profile/', '', {
    Authorization: `JWT ${tokenUser} `,
  }),
  logout: (token) => config('post', '/auth/v1/logout/', '', {
    Authorization: `JWT ${token} `,
  }),
  saveAnswerToServer: ({ tokenUser, answer, idListSurvey }) => config('post', '/answer/v1/', {
    answer,
    survey: idListSurvey,
  }, {
    Authorization: `JWT ${tokenUser} `,
  }),
  // account
  getAccount: (keyword) => config('get', `/account/v1/list-account/?search=${keyword}`),
  addAccount: (payload) => config('post', '/auth/v1/register/', payload),
  updateAccount: (payload) => config('patch', `/account/v1/${payload.id}/`, payload.data),
  deleteAccount: (payload) => config('post', '/account/v1/delete_account/', payload),
  changePassword: (payload) => config('post', '/auth/v1/change-password/', payload),
  // tenant
  getTenant: (keyword) => config('get', `/tenant/v1/list-tenant/?search=${keyword}`, ''),
  deleteTenant: (payload) => config('post', '/tenant/v1/delete-tenant/', payload),
  addTenant: (payload) => config('post', '/tenant/v1/', payload),
  updateTenant: (payload) => config('patch', `/tenant/v1/${payload.id}/`, payload.data),
  // chu nha
  getChuNha: (keyword) => config('get', `/chu-nha/v1/list-chu-nha/?search=${keyword}`, ''),
  deleteHost: (payload) => config('post', '/chu-nha/v1/delete_chunha/', payload),
  addHost: (payload) => config('post', '/chu-nha/v1/', payload),
  updateHost: (payload) => config('patch', `/chu-nha/v1/${payload.id}/`, payload.data),
  // khach thue
  getKhachThue: (keyword) => config('get', `/khach-thue/v1/list-khach_thue/?search=${keyword}`, ''),
  deleteGuest: (payload) => config('post', '/khach-thue/v1/delete_khachthue/', payload),
  addGuest: (payload) => config('post', '/khach-thue/v1/', payload),
  updateGuest: (payload) => config('patch', `/khach-thue/v1/${payload.id}/`, payload.data),
  // can ho
  getCanHo: (keyword) => config('get', `/can-ho/v1/list-can-ho/?search=${keyword}`, ''),
  deleteCanHo: (payload) => config('post', '/can-ho/v1/delete_canho/', payload),
  addCanHo: (payload) => config('post', '/can-ho/v1/', payload),
  updateCanHo: (payload) => config('patch', `/can-ho/v1/${payload.id}/`, payload.data),
  // toa nha
  getToaNha: (keyword) => config('get', `/toa-nha/v1/list-toa-nha/?search=${keyword}`, ''),
  deleteToaNha: (payload) => config('post', '/toa-nha/v1/delete_toanha/', payload),
  addBuilding: (payload) => config('post', '/toa-nha/v1/', payload),
  updateBuilding: (payload) => config('patch', `/toa-nha/v1/${payload.id}/`, payload.data),
  // dich vu
  getService: (keyword) => config('get', `/dich-vu/v1/list-dich-vu/?search=${keyword}`, ''),
  deleteService: (payload) => config('post', '/dich-vu/v1/delete_dichvu/', payload),
  // contract
  createContract: (payload) => config('post', '/hd-groups/v1/', payload.data),
  updateContract: (payload) => config('patch', `/hd-groups/v1/${payload.id}/`, payload.data),

  addService: (payload) => config('post', '/dich-vu/v1/', payload),
  updateService: (payload) => config('patch', `/dich-vu/v1/${payload.id}/`, payload.data),
  // payment
  getPayment: (payload) => config('get', `/payment/v1/list-payment/?can_ho=${payload.can_ho}&start_date=${payload.start_date}&end_date=${payload.end_date}`),
  sendEmailPayment: (payload) => config('post', '/payment/v1/send-mail-payment/', payload),
  payment: (payload) => config('post', '/payment/v1/payment/', payload),
  // unpayment
  getUnPayment: (payload) => config('get', `/payment/v1/list-unpaid-payment/?can_ho=${payload.can_ho}`),
  getUnPaymentService: (payload) => config('get', `/payment/v1/service-payment/list-unpaid-service-payment/?can_ho=${payload.can_ho}&dich_vu=${payload.service}`),
  // service payment
  getServicePayment: (payload) => config('get', `/payment/v1/service-payment/list-service-payment/?can_ho=${payload.can_ho}&dich_vu=${payload.service}&start_date=${payload.start_date}&end_date=${payload.end_date}`),
  paymentService: (payload) => config('post', '/payment/v1/service-payment/service-payment/', payload),
  // contract
  getContract: (keyword) => config('get', `/hd-groups/v1/list-hd-group/?search=${keyword}`, ''),
  deleteContract: (payload) => config('post', '/hd-groups/v1/delete_hdgroup/', payload),
  // overview
  overview: () => config('get', '/account/v1/overview/'),
  // district
  listDistrict: () => config('get', '/account/v1/list-district/'),
});

export default api;
