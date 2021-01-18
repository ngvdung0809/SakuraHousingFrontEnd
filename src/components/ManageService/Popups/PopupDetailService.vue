<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="detail.name" @hidden="cancel">
    <div class="popup-add-service ml-3 mr-3">
      <div class="form-input">
        <label for="name">
          <span class="text-color-required">*</span> Tên dịch vụ:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="name"
            v-model="$v.data.name.$model"
            :state="validateState('name')"
            aria-describedby="input-name-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-name-feedback" v-if="!$v.data.name.required" >
            Vui lòng nhập tên dịch vụ
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="don_vi">
          Đơn vị:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="don_vi"
            v-model="$v.data.don_vi.$model"
            :state="validateState('don_vi')"
            aria-describedby="input-don_vi-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-don_vi-feedback" v-if="!$v.data.don_vi.maxLength" >
            Đơn vị không vượt quá 10 kí tự
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="code">
          Mã dịch vụ:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="code"
            v-model="$v.data.code.$model"
            :state="validateState('code')"
            aria-describedby="input-code-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-code-feedback" v-if="!$v.data.code.maxLength" >
            Mã dịch vụ không vượt quá 10 kí tự
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label>Định kỳ:</label>
        <div>
          <b-form-checkbox
            id="dinh_ky"
            v-model="data.dinh_ky"
            size="lg"
          ></b-form-checkbox>
        </div>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button 
        ref="btn_update_service"
         size="sm" 
         variant="success" 
         @click="submit"
      >
        Thay đổi
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import constants from '../../../constants/index';

export default {
  props: {
    idModal: {
      type: String,
    },
    detail: {
      type: Object,
    },
  },
  mixins: [validationMixin],
  data() {
    return {
      constants,
      data: {
        name: this.detail.name,
        don_vi: this.detail.don_vi,
        code: this.detail.code,
        dinh_ky: this.detail.dinh_ky,
      },
    };
  },
  validations: {
    data: {
      name: {
        required,
      },
      don_vi: {
        maxLength: maxLength(10),
      },
      code: {
        maxLength: maxLength(10),
      },
    },
  },
  watch: {
    dataSubmit: {
      handler(val) {
        this.data = val;
      },
    },
  },
  computed: {
    ...mapGetters(['getErrorCodeService']),
    dataSubmit() {
      const result = {
        name: this.detail.name,
        don_vi: this.detail.don_vi,
        code: this.detail.code,
        dinh_ky: this.detail.dinh_ky,
      };
      return result;
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.data[name];
      return $dirty ? !$error : null;
    },
    clearErrorValidate() {
      this.$nextTick(() => {
        this.$v.data.$reset();
      });
    },
    resetData() {
      this.data = {
        name: this.detail.name,
        don_vi: this.detail.don_vi,
        code: this.detail.code,
        dinh_ky: this.detail.dinh_ky,
      }
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
      this.resetData();
    },
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.data.$anyError) {
        return;
      }
      const payload = {
        id: this.detail.id,
        data: this.data,
      };
      // const submitButton = this.$refs.btn_update_service;
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateService', payload);
      if (this.getErrorCodeService === 0) {
        this.clearErrorValidate();
        this.cancel();
        this.$emit('updateSelectedListId', []);
        await this.$store.dispatch('getService', '');
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_UPDATE_SUCCEED, 'success');
      } else {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_UPDATE_FAILED, 'danger');
      }
      // submitButton.classList.remove(
      //   'spinner',
      //   'spinner-light',
      //   'spinner-right',
      // );
    },
  },
};
</script>

<style lang='scss' scoped>
.popup-add-service {
  .form-input {
    display: grid;
    grid-template-columns: 20% 80%;
    margin-bottom: 12px;
    .b-dropdown {
      width: 130px;
      border: 1px solid #dcdcdc;
      outline: none;
    }
  }
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
    button {
      margin-right: 7px;
    }
    button:last-child {
      margin-right: 0px;
    }
  }
  .spinner.spinner-right {
    padding-right: 3.5rem !important;
  }
}
</style>
<style lang="scss">
.text-color-required {
  color: red;
}
</style>

// <style lang="scss">
//   .-disable {
//     opacity: 0.3;
//     cursor: default !important;
//   }
// </style>
