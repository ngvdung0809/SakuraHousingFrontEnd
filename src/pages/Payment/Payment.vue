<template>
  <div class="manage-payment-container">
    <div class="manage-payment-container__header">
      <Header />
    </div>
    <div class="manage-payment-container__filter">
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
      <b-form-select class="ml-5 mr-5" v-model="can_ho" :options="listCanHo"></b-form-select>
      <div class="d-flex justify-content-end">
        <b-button class="btn-search" @click="searchPayment">Tìm kiếm</b-button>
      </div>
    </div>
    <div class="manage-payment-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Căn hộ</th>
            <th scope="col">Đợt thanh toán</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Số tiền</th>
            <th scope="col">Người gửi-Người nhận</th>
            <th scope="col">Ngày TT dự kiến</th>
            <th scope="col">Ngày TT thực tế</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in listPayment" :key="index">
            <td>{{ payment.can_ho }}</td>
            <td>{{ payment.dot_thanh_toan }}</td>
            <td>
              <div :class="{
                  '-completed' : payment.status === constants.PAYMENT_CONST.PAYMENT_COMPLETED,
                  '-unCompleted' : payment.status === constants.PAYMENT_CONST.PAYMENT_UNCOMPLETED
                }"
              >
                {{ payment.status === constants.PAYMENT_CONST.PAYMENT_COMPLETED ? 'Đã thanh toán' : 'Chưa thanh toán' }}
              </div>
            </td>
            <td>{{ payment.so_tien }}</td>
            <td>{{ payment.obj}}</td>
            <td>{{ payment.ngay_thanh_toan_du_kien }}</td>
            <td>{{ payment.ngay_thanh_toan_tt }}</td>
            <td>
              <div class="show-detail">
                <b-icon-mailbox
                  variant="light"
                  :class="{
                    '-disable' : payment.status === constants.PAYMENT_CONST.PAYMENT_COMPLETED,
                  }"
                  v-if="payment.status === constants.PAYMENT_CONST.PAYMENT_COMPLETED"
                ></b-icon-mailbox>
                <b-icon-mailbox
                  variant="light"
                  @click="sendEmail(payment.id)"
                  v-else
                ></b-icon-mailbox>
                <b-icon-credit-card
                  variant="light"
                  :class="{
                    '-disable' : payment.status === constants.PAYMENT_CONST.PAYMENT_COMPLETED,
                  }"
                  v-if="payment.status === constants.PAYMENT_CONST.PAYMENT_COMPLETED"
                ></b-icon-credit-card>
                 <b-icon-credit-card
                  variant="light"
                  @click="getIdPayment(payment.id)"
                  v-b-modal.modal-payment
                  v-else
                ></b-icon-credit-card>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupPayment
        :titleModal="constants.PAYMENT_CONST.TITLE_POPUP_PAYMENT"
        :idModal="constants.PAYMENT_CONST.ID_POPUP_PAYMENT"
        :contentModal="constants.PAYMENT_CONST.CONTENT_POPUP_PAYMENT"
        :paymentId="paymentId"
        :getListPayment="getListPayment"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Header from '../../components/Payment/Headers/Header.vue';
import api from '../../core/services/api/api';
import constants from '../../constants/index';
import PopupPayment from '../../components/Payment/Popups/PopupPayment.vue'

export default {
  name: 'Payment',
  components: {
    Header,
    PopupPayment,
  },
  data() {
    return {
      responseData: [],
      constants,
      listCanHo: [],
      can_ho: '',
      start_date: new Date(new Date().setDate(new Date().getDate() - 30)),
      end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
      paymentId: 0,
    };
  },
  created() {
    this.getListPayment();
    this.getListCanHo();
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
    async getListPayment() {
      const start = moment(this.start_date).format('YYYY-MM-DD');
      const end = moment(this.end_date).format('YYYY-MM-DD');
      const payload = {
        can_ho: '',
        start_date: start,
        end_date: end,
      };
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('getPayment', payload);
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
    async searchPayment() {
      const payload = {
        can_ho: this.can_ho,
        start_date: this.start_date ? moment(this.start_date).format('YYYY-MM-DD') : '',
        end_date: this.end_date ? moment(this.end_date).format('YYYY-MM-DD') : '',
      };
      const response = await api('getPayment', payload);
      if (response.data.error_code === 0) {
        this.responseData = response.data.data;
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
    async sendEmail(id) {
      const payload = {
        id,
        type_email: 2
      }
      const response = await api('sendEmailPayment', payload);
      if (response.data.error_code === 0) {
        this.makeToastMessage('Gửi email thành công', 'success');
      }
    },
    getIdPayment(id) {
      this.paymentId = id
    }
  },
  computed: {
    listPayment() {
      const result = [];
      this.responseData.forEach((item) => {
        result.push({
          can_ho: item.can_ho,
          ngay_thanh_toan_du_kien: item.ngay_thanh_toan_du_kien,
          ngay_thanh_toan_tt: item.ngay_thanh_toan_tt ? item.ngay_thanh_toan_tt : '-',
          dot_thanh_toan: item.dot_thanh_toan,
          status: item.status,
          so_tien: item.so_tien,
          obj: `${item.nguoi_gui} - ${item.nguoi_nhan}`,
          id: item.id,
        });
      });
      return result;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-payment-container {
  &__header {
    margin-bottom: 12px;
  }
  &__filter {
    display: grid;
    grid-template-columns: 50% 25% 25%;
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
