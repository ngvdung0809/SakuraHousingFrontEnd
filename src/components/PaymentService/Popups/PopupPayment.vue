<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal">
    <div>{{ contentModal }}</div>
    <div class="popup-add-account">
      <div class="form-input">
        <label for="so_tien">
          <span class="text-color-required">*</span> Số tiền:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="so_tien"
            v-model="$v.so_tien.$model"
            :state="validateState('so_tien')"
            aria-describedby="input-sotien-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-sotien-feedback" v-if="!$v.so_tien.required" >
            Xin hãy nhập số  tiền!
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="input-sotien-feedback" v-if="!$v.so_tien.minValue" >
            Số  tiền phải là số  nguyên dương!
          </b-form-invalid-feedback>
        </div>
      </div>
    </div>
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
import { validationMixin } from 'vuelidate';
import { required, minValue } from 'vuelidate/lib/validators';
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
    paymentServiceId: {
      type: Number,
    },
    getListPayment: {
      type: Function,
    },
  },
  mixins: [validationMixin],
  data() {
    return {
      constants,
      so_tien: 0
    };
  },
  validations: {
    so_tien: {
      required,
      minValue: minValue(0)
    },
  },
  methods: {
    clearErrorValidate() {
      this.so_tien = 0;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    async payment() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      const payload = {
        id: this.paymentServiceId,
        so_tien: this.so_tien
      };
      const response = await api('paymentService', payload);
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
      this.clearErrorValidate();
    },
  },
};
</script>

<style lang="scss">
.text-color-required {
  color: red;
}
</style>
