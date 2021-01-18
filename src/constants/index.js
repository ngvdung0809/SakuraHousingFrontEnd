const COMMON_CONST = {
  MESSAGE_UPDATE_SUCCEED: 'Sửa thành công',
  MESSAGE_UPDATE_FAILED: 'Sửa thất bại',
  MESSAGE_ADD_SUCCEED: 'Tạo mới thành công',
  MESSAGE_ADD_FAILED: 'Tạo mới thất bại',
  MESSAGE_DELETE_SUCCEED: 'Xóa thành công',
  MESSAGE_DELETE_FAILED: 'Xóa mới thất bại',
  MESSAGE_DELETE_MY_ACCOUNT: 'Không thể xóa tài khoản của chính mình',
  MESSAGE_CHANGE_PASSWORD_SUCCEED: 'Mật khẩu đã được thay đổi',
  MESSAGE_CHANGE_PASSWORD_FAILED: 'Không thể thay đổi mật khẩu. Xin hãy xác nhận lại!',
  PIE_CHART_OPTIONS: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['HĐ Thuê', 'HĐ MÔI GIỚI', 'HĐ DỊCH VỤ'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 345,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  },
  BAR_CHART_OPTION: {
    colors: ['#FD6585'],
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Tài khoản', 'Chủ nhà', 'Khách thuê', 'Tòa nhà', 'Căn hộ'],
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
  MENU_TAB_SUMMARY: ['Chủ nhà', 'Khách thuê', 'Toàn nhà', 'Căn hộ'],
  CONTRACT: ['hd_dich_vu', 'hd_moi_gioi', 'hd_thue'],
  TITLE_CONTRACT_CHART: 'Bộ hợp đồng',
};

const ACCOUNT_CONST = {
  HEADER_MANAGE_ACCOUNT: 'QUẢN LÝ TÀI KHOẢN',
  TITLE_MANAGE_ACCOUNT: 'Thêm tài khoản',
  ID_POPUP_ADD_ACCOUNT: 'modal-add-account',
  ID_POPUP_DETAIL_ACCOUNT: 'modal-detail-account',
  ID_POPUP_DELETE_ACCOUNT: 'modal-delete-account',
  CONTENT_POPUP_DELETE_ACCOUNT: 'Bạn có chắc chắn muốn xóa tài khoản này ?',
  TITLE_POPUP_ADD_ACCOUNT: 'Thêm tài khoản',
  TITLE_POPUP_DETAIL_ACCOUNT: 'Chi tiết tài khoản',
  TITLE_POPUP_DELETE_ACCOUNT: 'Xóa tài khoản',
};

const CANHO_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ CĂN HỘ',
  TITLE_MANAGE: 'Thêm căn hộ',
  ID_POPUP_ADD: 'modal-add-canho',
  ID_POPUP_DETAIL: 'modal-detail-canho',
  ID_POPUP_DELETE: 'modal-delete-canho',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa căn hộ này ?',
  TITLE_POPUP_ADD: 'Thêm căn hộ',
  TITLE_POPUP_DELETE: 'Xóa căn hộ',
};

const TOANHA_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ TÒA NHÀ',
  TITLE_MANAGE: 'Thêm tòa nhà',
  ID_POPUP_ADD: 'modal-add-toanha',
  ID_POPUP_DETAIL: 'modal-detail-toanha',
  ID_POPUP_DELETE: 'modal-delete-toanha',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa tòa nhà này ?',
  TITLE_POPUP_ADD: 'Thêm tòa nhà',
  TITLE_POPUP_DELETE: 'Xóa tòa nhà',
};

const SERVICE_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ DỊCH VỤ',
  TITLE_MANAGE: 'Thêm dịch vụ',
  ID_POPUP_ADD: 'modal-add-service',
  ID_POPUP_DETAIL: 'modal-detail-service',
  ID_POPUP_DELETE: 'modal-delete-service',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa dịch vụ này ?',
  TITLE_POPUP_ADD: 'Thêm dịch vụ',
  TITLE_POPUP_DELETE: 'Xóa dịch vụ',
};

const CHUNHA_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ CHỦ NHÀ',
  TITLE_MANAGE: 'Thêm chủ nhà',
  ID_POPUP_ADD: 'modal-add-chunha',
  ID_POPUP_DETAIL: 'modal-detail-chunha',
  ID_POPUP_DELETE: 'modal-delete-chunha',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa chủ nhà này ?',
  TITLE_POPUP_ADD: 'Thêm chủ nhà',
  TITLE_POPUP_DELETE: 'Xóa chủ nhà',
};

const GUEST_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ KHÁCH THUÊ',
  TITLE_MANAGE: 'Thêm khách thuê',
  ID_POPUP_ADD: 'modal-add-guest',
  ID_POPUP_DETAIL: 'modal-detail-guest',
  ID_POPUP_DELETE: 'modal-delete-guest',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa khách thuê này ?',
  TITLE_POPUP_ADD: 'Thêm khách thuê',
  TITLE_POPUP_DELETE: 'Xóa khách thuê',
};

const TENANT_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ CÔNG TY',
  TITLE_MANAGE: 'Thêm công ty',
  ID_POPUP_ADD: 'modal-add-tenant',
  ID_POPUP_DETAIL: 'modal-detail-tenant',
  ID_POPUP_DELETE: 'modal-delete-tenant',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa công ty này ?',
  TITLE_POPUP_ADD: 'Thêm công ty',
  TITLE_POPUP_DELETE: 'Xóa công ty',
};

const CONTRACT_CONST = {
  HEADER_MANAGE: 'QUẢN LÝ BỘ HỢP ĐỒNG',
  TITLE_MANAGE: 'Thêm bộ hợp đồng',
  ID_POPUP_ADD: 'modal-add-contract',
  ID_POPUP_DETAIL: 'modal-detail-contract',
  ID_POPUP_DELETE: 'modal-delete-contract',
  CONTENT_POPUP_DELETE: 'Bạn có chắc chắn muốn xóa bộ hợp đồng này ?',
  TITLE_POPUP_ADD: 'Thêm bộ hợp đồng',
  TITLE_POPUP_DELETE: 'Xóa bộ hợp đồng',
};

const PAYMENT_CONST = {
  PAYMENT_COMPLETED: 1,
  PAYMENT_UNCOMPLETED: 2,
  ID_POPUP_PAYMENT: 'modal-payment',
  HEADER_MANAGE: 'QUẢN LÝ THANH TOÁN HỢP ĐỒNG',
  CONTENT_POPUP_PAYMENT: 'Bạn có chắc chắn muốn thanh toán kỳ thanh toán này ?',
  TITLE_POPUP_PAYMENT: 'Thanh toán hợp đồng',
};

const UNPAYMENT_CONST = {
  PAYMENT_COMPLETED: 1,
  PAYMENT_UNCOMPLETED: 2,
  ID_POPUP_PAYMENT: 'modal-unpayment',
  HEADER_MANAGE: 'QUẢN LÝ NỢ XẤU THANH TOÁN HỢP ĐỒNG',
  CONTENT_POPUP_PAYMENT: 'Bạn có chắc chắn muốn thanh toán kỳ thanh toán này ?',
  TITLE_POPUP_PAYMENT: 'Thanh toán hợp đồng',
};

const PAYMENT_SERVICE_CONST = {
  PAYMENT_COMPLETED: 1,
  PAYMENT_UNCOMPLETED: 2,
  ID_POPUP_PAYMENT: 'modal-payment-service',
  HEADER_MANAGE: 'QUẢN LÝ THANH TOÁN PHÍ DỊCH VỤ',
  CONTENT_POPUP_PAYMENT: 'Bạn có chắc chắn muốn thanh toán dịch vụ này ?',
  TITLE_POPUP_PAYMENT: 'Thanh toán phí dịch vụ',
};

const UNPAYMENT_SERVICE_CONST = {
  PAYMENT_COMPLETED: 1,
  PAYMENT_UNCOMPLETED: 2,
  ID_POPUP_PAYMENT: 'modal-payment-service',
  HEADER_MANAGE: 'QUẢN LÝ NỢ XẤU THANH TOÁN PHÍ DỊCH VỤ',
  CONTENT_POPUP_PAYMENT: 'Bạn có chắc chắn muốn thanh toán dịch vụ này ?',
  TITLE_POPUP_PAYMENT: 'Thanh toán phí dịch vụ',
};

export default {
  COMMON_CONST,
  ACCOUNT_CONST,
  CANHO_CONST,
  TOANHA_CONST,
  SERVICE_CONST,
  CHUNHA_CONST,
  GUEST_CONST,
  TENANT_CONST,
  PAYMENT_CONST,
  UNPAYMENT_CONST,
  CONTRACT_CONST,
  PAYMENT_SERVICE_CONST,
  UNPAYMENT_SERVICE_CONST,
};
