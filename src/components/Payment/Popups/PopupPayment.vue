<template>
  <b-modal :id="idModal" no-close-on-backdrop size="sm" :title="titleModal">
    <div>{{ contentModal }}</div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel">
        Không
      </b-button>
      <b-button size="sm" variant="success" @click="payment">
        Có
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '../../../constants/index';
import api from '../../../core/services/api/api';

export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    },
    contentModal: {
      type: String,
    },
    paymentId: {
      type: Number,
    },
    getListPayment: {
      type: Function,
    },
  },
  data() {
    return {
      constants,
    };
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
    async payment() {
      const payload = {
        id: this.paymentId,
      };
      const response = await api('payment', payload);
      if (response.data.error_code === 0) {
        this.makeToastMessage('Thanh toán thành công', 'success');
        this.getListPayment();
      } else {
        this.makeToastMessage('Thanh toán thất bại', 'danger');
      }
      this.cancel();
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
