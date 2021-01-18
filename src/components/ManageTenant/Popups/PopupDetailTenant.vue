<template>
  <b-modal :id="idModal" no-close-on-backdrop :title="detail.name" size="xl" @hidden="cancel">
    <div class="popup-add-tenant ml-3 mr-3">
      <div>
        <b-row>
          <b-col cols="4" class="d-flex">
            <label for="name" class="align-items-center w-50"><span class="text-color-red">*</span> Tên công ty:</label>
            <b-form-input 
              placeholder="" id="name"
              v-model="$v.data.name.$model"
              :state="validateState('name')"
              aria-describedby="input-name-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-name-feedback" v-if="!$v.data.name.required" >
              Vui lòng nhập tên công ty
            </b-form-invalid-feedback>
          </b-col>
          <b-col cols="4" class="d-flex">
            <label for="rep" class="align-items-center w-50">Người đại diện:</label>
            <b-form-input 
              placeholder="" id="rep"
              v-model="data.rep"
            ></b-form-input>
          </b-col>
          <b-col cols="4" class="d-flex">
            <label for="repRole" class="align-items-center w-50">Chức vụ:</label>
            <b-form-input 
              placeholder="" id="repRole"
              v-model="data.rep_role"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col cols="4" class="d-flex">
            <div class="d-flex w-100">
              <label for="taxCode" class="align-items-center w-50">Mã số thuế:</label>
              <b-form-input placeholder="" id="taxCode" v-model="data.tax_code"></b-form-input>
            </div>
          </b-col>
          <b-col cols="4" class="d-flex">
            <div class="d-flex w-100">
              <label for="dkkd" class="align-items-center w-50">Giấy phép ĐKKD:</label>
              <b-form-input placeholder="" id="dkkd" v-model="data.dkkd"></b-form-input>
            </div>
          </b-col>
          <b-col cols="4" class="d-flex">
            <div class="d-flex w-100">
              <label for="address" class="align-items-center w-50">Địa chỉ:</label>
              <b-form-input placeholder="" id="address" v-model="data.address"></b-form-input>
            </div>
          </b-col>
        </b-row>
      </div>

      <div>
        <h2 class="header mt-5 mb-5">THÔNG TIN LIÊN HỆ</h2>
        <b-row>
          <b-col class="d-flex" cols="4">
            <label for="phoneNumber" class="align-items-center w-50"><span class="text-color-red">*</span> Số điện thoại:</label>
            <b-form-input 
              placeholder="" id="phoneNumber"
              v-model="$v.data.phone.$model"
              :state="validateState('phone')"
              aria-describedby="input-phone-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-phone-feedback" v-if="!$v.data.phone.numeric | !$v.data.phone.required" >
              Vui lòng nhập số  điện thoại
            </b-form-invalid-feedback>
          </b-col>

          <b-col class="d-flex" cols="4">
            <b-form-checkbox
              id="checkbox-phone"
              name="checkbox-phone"
              class="w-50 align-items-center"
              v-model="phoneNumberSub"
            >
              SDT dự phòng
            </b-form-checkbox>
            <b-form-input placeholder="" id="phoneNumber-sub" v-show="phoneNumberSub" v-model="data.phone2"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col class="d-flex" cols="4">
            <label for="email" class="align-items-center w-50"><span class="text-color-red">*</span> Email:</label>
            <b-form-input 
              placeholder="" id="email"
              v-model="$v.data.email.$model"
              :state="validateState('email')"
              aria-describedby="input-email-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-email-feedback" v-if="!$v.data.email.email | !$v.data.email.required" >
              Vui lòng nhập địa chỉ email
            </b-form-invalid-feedback>
          </b-col>

          <b-col class="d-flex" cols="4">
            <b-form-checkbox
              id="checkbox-email"
              name="checkbox-email"
              class="w-50 align-items-center"
              v-model="emailSub"
            >
              Email dự phòng
            </b-form-checkbox>
            <b-form-input placeholder="" id="email-sub" v-show="emailSub" v-model="data.email2"></b-form-input>
          </b-col>
        </b-row>
      </div>

      <div>
        <h2 class="header mt-5 mb-5">THÔNG TIN TÀI KHOẢN NGÂN HÀNG</h2>
        <b-row>
          <b-col cols="3" class="d-flex">
            <label for="accountBank" class="align-items-center w-50">Số Tk:</label>
            <b-form-input 
              placeholder="" id="accountBank"
              v-model="data.so_TK"
            ></b-form-input>
          </b-col>
          <b-col cols="3" class="d-flex">
            <label for="bank" class="align-items-center w-50">Ngân hàng:</label>
            <b-form-input 
              placeholder="" id="bank"
              v-model="data.ngan_hang"
            ></b-form-input>
          </b-col>
          <b-col cols="3" class="d-flex">
            <label for="branch" class="align-items-center w-50">Chi nhánh:</label>
            <b-form-input 
              placeholder="" id="branch"
              v-model="data.chi_nhanh"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col>
            <b-form-checkbox
              id="checkbox-account-bank-2"
              name="checkbox-account-bank-2"
              v-model="bankAccountSub"
            >
              Tài khoản ngân hàng dự phòng
            </b-form-checkbox>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="accountBank-sub" class="align-items-center w-50" v-show="bankAccountSub">Số Tk:</label>
              <b-form-input placeholder="" id="accountBank-sub" v-show="bankAccountSub" v-model="data.so_TK2"></b-form-input>
            </div>
          </b-col>
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="bank-sub" class="align-items-center w-50" v-show="bankAccountSub">Ngân hàng:</label>
              <b-form-input placeholder="" id="bank-sub" v-show="bankAccountSub" v-model="data.ngan_hang2"></b-form-input>
            </div>
          </b-col>
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="branch-sub" class="align-items-center w-50" v-show="bankAccountSub">Chi nhánh:</label>
              <b-form-input placeholder="" id="branch-sub" v-show="bankAccountSub" v-model="data.chi_nhanh2"></b-form-input>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col class="d-flex">
            <label for="textarea-description" class="align-items-center w-25">Mô tả:</label>
            <b-form-textarea
              id="textarea-description"
              placeholder="Nhập mô tả"
              rows="3"
              max-rows="6"
              v-model="data.description"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col class="d-flex">
            <label for="textarea-note" class="align-items-center w-25">Ghi chú:</label>
            <b-form-textarea
              id="textarea-note"
              placeholder="Nhập ghi chú"
              rows="3"
              max-rows="6"
              v-model="data.note"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </div>
    </div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel" >
        Hủy bỏ
      </b-button>
      <b-button ref="btn_add_chunha" size="sm" variant="success" @click="submit" >
        Thay đổi
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, numeric } from 'vuelidate/lib/validators';
import constants from '../../../constants/index';

export default {
  props: {
    titleModal: {
      type: String,
    },
    idModal: {
      type: String,
    },
    detail: {
      type: Object,
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      phoneNumberSub: false,
      emailSub: false,
      bankAccountSub: false,
      data: {
        name: this.detail?.name,
        address: this.detail?.address,
        description: this.detail?.description,
        phone: this.detail?.phone,
        phone2: this.detail?.phone2,
        email: this.detail?.email,
        email2: this.detail?.email2,
        dkkd: this.detail?.dkkd,
        tax_code: this.detail?.tax_code,
        rep: this.detail?.rep,
        rep_role: this.detail?.rep_role,
        so_TK: this.detail?.so_TK,
        chi_nhanh: this.detail?.chi_nhanh,
        ngan_hang: this.detail?.ngan_hang,
        so_TK2: this.detail?.so_TK2,
        chi_nhanh2: this.detail?.chi_nhanh2,
        ngan_hang2: this.detail?.ngan_hang2,
        note: this.detail?.note,
      },
      constants,
    };
  },
  validations: {
    data: {
      name: {
        required,
      },
      phone: {
        required,
        numeric,
      },
      email: {
        email,
        required,
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
    ...mapGetters(['getErrorCodeTenant']),
    dataSubmit() {
      const result = {
        name: this.detail?.name,
        address: this.detail?.address,
        description: this.detail?.description,
        phone: this.detail?.phone,
        phone2: this.detail?.phone2,
        email: this.detail?.email,
        email2: this.detail?.email2,
        dkkd: this.detail?.dkkd,
        tax_code: this.detail?.tax_code,
        rep: this.detail?.rep,
        rep_role: this.detail?.rep_role,
        so_TK: this.detail?.so_TK,
        chi_nhanh: this.detail?.chi_nhanh,
        ngan_hang: this.detail?.ngan_hang,
        so_TK2: this.detail?.so_TK2,
        chi_nhanh2: this.detail?.chi_nhanh2,
        ngan_hang2: this.detail?.ngan_hang2,
        note: this.detail?.note,
      };
      return result;
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.data[name];
      return $dirty ? !$error : null;
    },
    resetData() {
      this.data = {
        name: this.detail?.name,
        address: this.detail?.address,
        description: this.detail?.description,
        phone: this.detail?.phone,
        phone2: this.detail?.phone2,
        email: this.detail?.email,
        email2: this.detail?.email2,
        dkkd: this.detail?.dkkd,
        tax_code: this.detail?.tax_code,
        rep: this.detail?.rep,
        rep_role: this.detail?.rep_role,
        so_TK: this.detail?.so_TK,
        chi_nhanh: this.detail?.chi_nhanh,
        ngan_hang: this.detail?.ngan_hang,
        so_TK2: this.detail?.so_TK2,
        chi_nhanh2: this.detail?.chi_nhanh2,
        ngan_hang2: this.detail?.ngan_hang2,
        note: this.detail?.note,
      };
      this.phoneNumberSub = true;
      this.emailSub = true;
      this.bankAccountSub = true;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
      this.resetData()
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
      const payload = this.data;
      const submitData = {
        id: this.detail.id,
        data: payload
      }
      // const submitButton = this.$refs.btn_add_chunha;
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('updateTenant', submitData);
      if (this.getErrorCodeTenant === 0) {
        this.clearErrorValidate();
        this.cancel()
        this.$emit('updateSelectedListId', []);
        await this.$store.dispatch('getTenant', '');
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
    clearErrorValidate() {
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 40%;
  border-bottom: 3px solid #6a02e8;
  h1 {
    font-weight: 900;
  }
}
.w-32 {
  width: 32%;
}
.w-68 {
  width: 68%;
}
</style>

<style lang="scss">
.justify-content-between {
  display: flex;
  justify-content: space-between;
}
.align-items-center {
  display: flex;
  align-items: center;
}
.text-color-red {
  color: red;
}
textarea {
  overflow: auto;
}
.modal-xl {
  max-width: 70vw !important;
}
</style>
