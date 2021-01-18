<template>
  <div class="manage-unpayment-container">
    <div class="manage-payment-container__header">
      <Header />
    </div>
    <div class="manage-unpayment-container__filter">
      <!-- <select id="can_ho" class="b-dropdown" v-model="can_ho">
        <option value="">Tất cả</option>
        <option v-for="can_ho in listCanHo" :key="can_ho.id" :value="can_ho.id" >{{ can_ho.name }}</option>  
      </select> -->
      <b-form-select class="b-dropdown" v-model="can_ho" :options="listCanHo"></b-form-select>

      <div class="d-flex justify-content-end">
        <b-button class="btn-search" @click="searchUnPayment">Tìm kiếm</b-button>
      </div>
    </div>
    <div class="manage-unpayment-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Căn hộ</th>
            <th scope="col">Đợt thanh toán</th>
            <th scope="col">Số tiền</th>
            <th scope="col">Người gửi-Người nhận</th>
            <th scope="col">Ngày thanh toán dự kiến</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in listUnPayment" :key="index">
            <td>{{ payment.can_ho }}</td>
            <td>{{ payment.dot_thanh_toan }}</td>
            <td>{{ payment.so_tien }}</td>
            <td>{{ payment.obj}}</td>
            <td>{{ payment.ngay_thanh_toan_du_kien }}</td>
            <td>
              <div class="show-detail">
                <b-icon-mailbox
                  variant="light"
                  @click="sendEmail(payment.id)"
                ></b-icon-mailbox>
                <b-icon-credit-card
                  variant="light"
                  @click="getIdPayment(payment.id)"
                  v-b-modal.modal-unpayment
                ></b-icon-credit-card>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupPayment
        :titleModal="constants.UNPAYMENT_CONST.TITLE_POPUP_PAYMENT"
        :idModal="constants.UNPAYMENT_CONST.ID_POPUP_PAYMENT"
        :contentModal="constants.UNPAYMENT_CONST.CONTENT_POPUP_PAYMENT"
        :paymentId="paymentId"
        :getListUnPayment="getListUnPayment"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Header from '../../components/UnPayment/Headers/Header.vue';
import api from '../../core/services/api/api';
import constants from '../../constants/index';
import PopupPayment from '../../components/UnPayment/Popups/PopupUnPayment.vue';

export default {
  name: 'UnPayment',
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
      paymentId: 0,
    };
  },
  created() {
    this.getListUnPayment();
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
    async getListUnPayment() {
      const payload = {
        can_ho: '',
      };
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('getUnPayment', payload);
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
    async searchUnPayment() {
      const payload = {
        can_ho: this.can_ho,
      };
      const response = await api('getUnPayment', payload);
      if (response.data.error_code === 0) {
        this.responseData = response.data.data;
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
    async sendEmail(id) {
      const payload = {
        id,
        type_email: 1
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
    listUnPayment() {
      const result = [];
      this.responseData.forEach((item) => {
        result.push({
          can_ho: item.can_ho,
          ngay_thanh_toan_du_kien: item.ngay_thanh_toan_du_kien,
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
.manage-unpayment-container {
  &__header {
    margin-bottom: 12px;
  }
  &__filter {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 12px 0px;
    .b-dropdown {
      width: 60%;
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
