<template>
  <div class="manage-servicepayment-container">
    <div class="manage-servicepayment-container__header">
      <Header />
    </div>
    <div class="manage-servicepayment-container__filter">
      <div class="d-flex">
        <b-form-datepicker
        id="datepicker-buttons"
        class="mr-2"
        today-button
        reset-button
        close-button
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        v-model="start_date"
        locale="vi"
        ></b-form-datepicker>
        <b-form-datepicker
          id="datepicker-buttons_2"
          class="ml-2"
          today-button
          reset-button
          close-button
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          locale="vi"
          v-model="end_date"
        ></b-form-datepicker>
      </div>
      <div class="d-flex ml-4">
        <b-form-select v-model="can_ho" :options="listCanHo"></b-form-select>
        <b-form-select class="ml-4" v-model="service" :options="listService"></b-form-select>
      </div>
      <div class="d-flex justify-content-end">
        <b-button class="btn-search" @click="searchServicePayment">Tìm kiếm</b-button>
      </div>
    </div>
    <div class="manage-servicepayment-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Căn hộ</th>
            <th scope="col">Dịch vụ</th>
            <th scope="col">Đợt thanh toán</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Số tiền</th>
            <th scope="col">Ngày TT dự kiến</th>
            <th scope="col">Ngày TT thực tế</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in listServicePayment" :key="index">
            <td>{{ payment.can_ho }}</td>
            <td>{{ payment.dich_vu }}</td>
            <td>{{ payment.dot_thanh_toan }}</td>
            <td>
              <div :class="{
                  '-completed' : payment.status === constants.PAYMENT_SERVICE_CONST.PAYMENT_COMPLETED,
                  '-unCompleted' : payment.status === constants.PAYMENT_SERVICE_CONST.PAYMENT_UNCOMPLETED
                }"
              >
                {{ payment.status === constants.PAYMENT_SERVICE_CONST.PAYMENT_COMPLETED ? 'Đã thanh toán' : 'Chưa thanh toán' }}
              </div>
            </td>
            <td>{{ payment.so_tien }}</td>
            <td>{{ payment.ngay_thanh_toan_du_kien }}</td>
            <td>{{ payment.ngay_thanh_toan_tt }}</td>
            <td>
              <div class="show-detail">
                <b-icon-credit-card
                  variant="light"
                  :class="{
                    '-disable' : payment.status === constants.PAYMENT_SERVICE_CONST.PAYMENT_COMPLETED,
                  }"
                  v-if="payment.status === constants.PAYMENT_SERVICE_CONST.PAYMENT_COMPLETED"
                ></b-icon-credit-card>
                 <b-icon-credit-card
                  variant="light"
                  @click="getIdPayment(payment.id)"
                  v-b-modal.modal-payment-service
                  v-else
                ></b-icon-credit-card>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupServicePayment
        :titleModal="constants.PAYMENT_SERVICE_CONST.TITLE_POPUP_PAYMENT"
        :idModal="constants.PAYMENT_SERVICE_CONST.ID_POPUP_PAYMENT"
        :contentModal="constants.PAYMENT_SERVICE_CONST.CONTENT_POPUP_PAYMENT"
        :paymentServiceId="paymentServiceId"
        :getListPayment="getListServicePayment"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Header from '../../components/PaymentService/Headers/Header.vue';
import api from '../../core/services/api/api';
import constants from '../../constants/index';
import PopupServicePayment from '../../components/PaymentService/Popups/PopupPayment.vue'

export default {
  name: 'ServicePayment',
  components: {
    Header,
    PopupServicePayment,
  },
  data() {
    return {
      responseData: [],
      constants,
      listCanHo: [],
      listService: [],
      can_ho: '',
      service: '',
      start_date: new Date(new Date().setDate(new Date().getDate() - 30)),
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
      paymentServiceId: 0,
    };
  },
  created() {
    this.getListServicePayment();
    this.getListCanHo();
    this.getListService()
  },
  methods: {
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    async getListServicePayment() {
      const start = moment(this.start_date).format('YYYY-MM-DD');
      const end = moment(this.end_date).format('YYYY-MM-DD');
      const payload = {
        can_ho: '',
        service: '',
        start_date: start,
        end_date: end,
      };
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('getServicePayment', payload);
      this.$store.commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        this.responseData = response.data.data;
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
    async getListCanHo() {
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('getCanHo', '');
      this.$store.commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        this.listCanHo = response.data.data.map((canHo) => ({
          value: canHo.id,
          text: canHo.name
        }));
        this.listCanHo.unshift({
          value: '',
          text: 'Tất cả căn hộ'
        })
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
    async getListService() {
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('getService', '');
      this.$store.commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        this.listService = response.data.data.map((service) => ({
          value: service.id,
          text: service.name
        }));
        this.listService.unshift({
          value: '',
          text: 'Tất cả dịch vụ'
        })
      } else {  
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
    async searchServicePayment() {
      const payload = {
        can_ho: this.can_ho,
        service: this.service,
        start_date: this.start_date ? moment(this.start_date).format('YYYY-MM-DD') : '',
        end_date: this.end_date ? moment(this.end_date).format('YYYY-MM-DD') : '',
      };
      const response = await api('getServicePayment', payload);
      if (response.data.error_code === 0) {
        this.responseData = response.data.data;
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
    getIdPayment(id) {
      this.paymentServiceId = id
    }
  },
  computed: {
    listServicePayment() {
      const result = [];
      this.responseData.forEach((item) => {
        result.push({
          can_ho: item.can_ho,
          ngay_thanh_toan_du_kien: item.ngay_thanh_toan_du_kien,
          ngay_thanh_toan_tt: item.ngay_thanh_toan_tt ? item.ngay_thanh_toan_tt : '-',
          dot_thanh_toan: item.dot_thanh_toan,
          status: item.status,
          so_tien: item.so_tien ? item.so_tien : '-',
          dich_vu: item.dich_vu,
          id: item.id,
        });
      });
      return result;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-servicepayment-container {
  &__header {
    margin-bottom: 12px;
  }
  &__filter {
    display: grid;
    grid-template-columns: 40% 40% 20%;
    margin: 12px 0px;
    .b-dropdown {
      outline: none;
      border: 1px solid #dcdcdc;
    }
    .btn-search {
      width: 160px;

    }
  }
  &__table {
    th, td {
      text-align: center;
    }
    .show-detail {
      svg {
        border-radius: 50%;
        background: #1a9fed;
        padding: 5px;
        width: 32px;
        height: 32px;
        margin-right: 5px;
        cursor: pointer;
      }
      .-disable {
        opacity: 0.4;
        cursor: default;
      }
    }
    .-completed {
      background: #e0bc45;
      color: #ffffff;
    }
    .-unCompleted {
      background: #b30b3d;
      color: #ffffff;
    }
  }
}
</style>
<style lang='scss'>
th {
  background: #dcdcdc;
}
td {
  vertical-align: middle !important;
  padding: 10px !important;
}
</style>
