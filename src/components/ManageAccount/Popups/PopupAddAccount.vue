<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal" @hidden="cancel">
    <div class="popup-add-account ml-3 mr-3">
      <div class="form-input">
        <label for="username">
          <span class="text-color-required">*</span> Tài khoản:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="username"
            v-model="$v.userName.$model"
            :state="validateState('userName')"
            aria-describedby="input-username-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-username-feedback" v-if="!$v.userName.required" >
            Xin hãy nhập tên tài khoản
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="password">
          <span class="text-color-required">*</span> Mật khẩu:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="password"
            type="password"
            v-model="$v.password.$model"
            :state="validateState('password')"
            aria-describedby="input-password-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-password-feedback" v-if="!$v.password.required" >
            Xin hãy nhập mật khẩu
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="input-password-feedback" v-if="!$v.password.passwordRegex" >
            Mật khẩu có ít nhất 8 kí tự và phải bao gồm chữ hoa, chữ thường và số
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="confirmPassword">
          <span class="text-color-required">*</span> Xác nhận mật khẩu:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="confirmPassword"
            type="password"
            v-model="$v.confirmPassword.$model"
            :state="validateState('confirmPassword')"
            aria-describedby="input-confirmPassword-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-confirmPassword-feedback" v-if="!$v.confirmPassword.required" >
            Xin hãy xác nhận mật khẩu
          </b-form-invalid-feedback>
          <b-form-invalid-feedback id="input-confirmPassword-feedback" v-else-if="!$v.confirmPassword.sameAsPassword" >
            Xác nhận mật khẩu không khớp
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="fullName">
          <span class="text-color-required">*</span> Tên nhân viên:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="fullName"
            v-model="$v.fullName.$model"
            :state="validateState('fullName')"
            aria-describedby="input-fullName-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-fullName-feedback" v-if="!$v.fullName.required" >
            Xin hãy nhập họ tên
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="role">
          <span class="text-color-required">*</span> Vai trò:
        </label>
        <div>
          <b-form-select 
            class="b-dropdown" 
            :options="listRole"
            v-model="$v.role.$model"
            :state="validateState('role')"
            aria-describedby="input-role-feedback"
          ></b-form-select>
          <b-form-invalid-feedback id="input-role-feedback" v-if="!$v.role.required" >
            Vui lòng chọn quyền tài khoản!
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="staffCode">Mã nhân viên:</label>
        <div>
          <b-form-input
            placeholder=""
            id="staffCode"
            v-model="$v.staffCode.$model"
            :state="validateState('staffCode')"
            aria-describedby="input-staffCode-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-staffCode-feedback" v-if="!$v.staffCode.minLength" >
            Mã nhân viên phải có tối thiểu 4 kí tự
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="company">
          <span class="text-color-required">*</span> Tên công ty:
        </label>
        <div>
          <b-form-select 
            class="b-dropdown" 
            :options="listTenant"
            v-model="$v.company.$model"
            :state="validateState('company')"
            aria-describedby="input-company-feedback"
          ></b-form-select>
          <b-form-invalid-feedback id="input-company-feedback" v-if="!$v.company.required" >
            Vui lòng chọn công ty chủ quản!
          </b-form-invalid-feedback>
        </div>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button ref="btn_add_account" size="sm" variant="success" @click="submit" >
        Tạo
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, sameAs, minLength, helpers } from 'vuelidate/lib/validators';
import constants from '../../../constants/index';

const passwordRegex = helpers.regex('passwordRegex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*?]{8,50}$/)

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
      userName: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: '',
      staffCode: '',
      company: '',
      listRole: [
        { value: '', text: 'Vui lòng chọn quyền của tài khoản', disabled: true },
        { value: 1, text: 'Admin', disabled: false },
        { value: 2, text: 'View', disabled: false },
        { value: 3, text: 'Disable', disabled: false },
      ],
      constants,
    };
  },
  validations: {
    userName: {
      required,
    },
    password: {
      required,
      passwordRegex,
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
    fullName: {
      required,
    },
    staffCode: {
      minLength: minLength(4),
    },
    role: {
      required,
    },
    company: {
      required,
    }
  },
  computed: {
    ...mapGetters(['getListTenant', 'getErrorCodeAccount']),
    listTenant() {
      let result = [];
      result = [
        { value: '', text: 'Vui lòng chọn công ty chủ quản', disabled: true },
        ...this.getListTenant.map((item) => ({ value: item.id, text: item.name })),
      ];
      return result
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    clearData() {
      this.userName = '';
      this.password = '';
      this.confirmPassword = '';
      this.fullName = '';
      this.role = '';
      this.staffCode = '';
      this.company = '';
    },
    clearErrorValidate() {
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
      this.clearData();
      this.clearErrorValidate()
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
        username: this.userName,
        password: this.password,
        full_name: this.fullName,
        role: this.role,
        staff_code: this.staffCode,
        tenant: this.company,
      };
      
      // const submitButton = this.$refs.btn_add_account;
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('addAccount', payload);
      if (this.getErrorCodeAccount === 0) {
        this.clearErrorValidate();
        this.$bvModal.hide(this.idModal);
        this.clearData();
        await this.$store.dispatch('getAccount', '');
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
.popup-add-account {
  .form-input {
    display: grid;
    grid-template-columns: 20% 80%;
    margin-bottom: 12px;
    .b-dropdown {
      width: 60%;
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
