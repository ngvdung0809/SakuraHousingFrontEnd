<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal" @hidden="cancel">
    <div class="popup-add-service ml-3 mr-3">
      <div class="form-input">
        <label for="name">
          <span class="text-color-required">*</span> Tên dịch vụ:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="name"
            v-model="$v.name.$model"
            :state="validateState('name')"
            aria-describedby="input-name-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-name-feedback" v-if="!$v.name.required" >
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
            v-model="$v.don_vi.$model"
            :state="validateState('don_vi')"
            aria-describedby="input-don_vi-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-don_vi-feedback" v-if="!$v.don_vi.maxLength" >
            Đơn vị không quá 10 kí tư
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
            v-model="$v.code.$model"
            :state="validateState('code')"
            aria-describedby="input-code-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-code-feedback" v-if="!$v.code.maxLength" >
            Mã dịch vụ không quá 10 kí tự
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="dinh_ky">Định kỳ:</label>
        <div>
          <b-form-checkbox
            id="dinh_ky"
            v-model="dinh_ky"
            size="lg"
          ></b-form-checkbox>
        </div>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button ref="btn_add_service" size="sm" variant="success" @click="submit" >
        Tạo
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import constants from '../../../constants/index';

// const alphaNumAndDotValidator = constants.ACCOUNT_CONST.REGEX_PASSWORD;

export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    },
  },
  mixins: [validationMixin],
  data() {
    return {
      name: '',
      don_vi: '',
      code: '',
      dinh_ky: true,
      constants,
    };
  },
  validations: {
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
  computed: {
    ...mapGetters(['getErrorCodeToaNha'])
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    clearData() {
      this.name = '';
      this.code = '';
      this.don_vi = '';
      this.dinh_ky = true;
    },
    clearErrorValidate() {
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
      this.clearData();
      this.clearErrorValidate();
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
      if (this.$v.$anyError) {
        return;
      }
      const payload = {
        name: this.name,
        don_vi: this.don_vi,
        code: this.code,
        dinh_ky: this.dinh_ky
      };
      // const submitButton = this.$refs.btn_add_service;
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('addService', payload);
      if (this.getErrorCodeToaNha === 0) {
        this.clearErrorValidate();
        this.cancel()
        await this.$store.dispatch('getService', '');
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_ADD_SUCCEED, 'success');
      } else {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_ADD_FAILED, 'danger');
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
