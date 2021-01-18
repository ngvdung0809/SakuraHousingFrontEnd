<template>
  <div class="manage-servicepayment-container">
    <div class="manage-servicepayment-container__header">
      <Header />
    </div>
    <div class="manage-servicepayment-container__filter">
      <div class="d-flex">
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
            <th scope="col">Ngày TT dự kiến</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in listServicePayment" :key="index">
            <td>{{ payment.can_ho }}</td>
            <td>{{ payment.dich_vu }}</td>
            <td>{{ payment.dot_thanh_toan }}</td>
            <td>{{ payment.ngay_thanh_toan_du_kien }}</td>
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
        :titleModal="constants.UNPAYMENT_SERVICE_CONST.TITLE_POPUP_PAYMENT"
        :idModal="constants.UNPAYMENT_SERVICE_CONST.ID_POPUP_PAYMENT"
        :contentModal="constants.UNPAYMENT_SERVICE_CONST.CONTENT_POPUP_PAYMENT"
        :paymentServiceId="paymentServiceId"
        :getListPayment="getListServicePayment"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Header from '../../components/UnPaymentService/Headers/Header.vue';
import api from '../../core/services/api/api';
import constants from '../../constants/index';
import PopupServicePayment from '../../components/UnPaymentService/Popups/PopupPayment.vue'

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
      const payload = {
        can_ho: '',
        service: '',
      };
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('getUnPaymentService', payload);
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
      };
      const response = await api('getUnPaymentService', payload);
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
          dot_thanh_toan: item.dot_thanh_toan,
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
    grid-template-columns: 50% 50%;
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
