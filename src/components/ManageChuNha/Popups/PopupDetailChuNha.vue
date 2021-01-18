<template>
  <b-modal :id="idModal" no-close-on-backdrop :title="detail.name" size="xl" @hidden="cancel">
    <div class="popup-add-chunha ml-3 mr-3">
      <div class="justify-content-between">
        <b-row>
          <b-col cols="4" class="d-flex">
            <label for="fullName" class="align-items-center w-50"><span class="text-color-red">*</span> Tên chủ nhà:</label>
            <b-form-input 
              placeholder="" id="fullName"
              v-model="$v.data.name.$model"
              :state="validateState('name')"
              aria-describedby="input-name-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-name-feedback" v-if="!$v.data.name.required" >
              Vui lòng nhập tên chủ nhà
            </b-form-invalid-feedback>

          </b-col>
          <b-col cols="4" class="d-flex">
            <label for="birthday" class="align-items-center w-50">Ngày sinh:</label>
            <b-form-datepicker
              class="pr-0"
              id="birthday"
              reset-button
              close-button
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="vi"
              v-model="data.birthday"
            ></b-form-datepicker>
          </b-col>
          <b-col cols="4" class="d-flex">
            <label for="address" class="align-items-center w-50"><span class="text-color-red">*</span>Địa chỉ:</label>
            <b-form-input 
              placeholder="" id="address"
              v-model="$v.data.address.$model"
              :state="validateState('address')"
              aria-describedby="input-address-feedback"
            ></b-form-input>
            <div>
            <b-form-invalid-feedback class="ml-3" id="input-address-feedback" v-if="!$v.data.address.required" >
              Vui lòng nhập địa chỉ chủ nhà
            </b-form-invalid-feedback>
            </div>
          </b-col>
        </b-row>
      </div>

      <div>
        <h2 class="header mt-5 mb-5">THÔNG TIN LIÊN LẠC</h2>
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
        <h2 class="header mt-5 mb-5">THÔNG TIN GIẤY TỜ TÙY THÂN</h2>
        <b-row>
          <b-col cols="2">
            <b-form-checkbox
              id="checkbox-cmnd"
              name="checkbox-cmnd"
              class="mb-2"
              v-model="checkboxCMT"
            >
              Chứng minh thư nhân dân
            </b-form-checkbox>
          </b-col>

          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="cmnd" class="align-items-center w-50" v-show="checkboxCMT">Số CMND:</label>
              <b-form-input placeholder="" id="cmnd" v-model="data.cmt" v-show="checkboxCMT"></b-form-input>
            </div>
          </b-col>

          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="noicap-cmnd" class="align-items-center w-50" v-show="checkboxCMT">Nơi cấp:</label>
              <b-form-input placeholder="" id="noicap-cmnd" v-model="data.cmt_NoiCap" v-show="checkboxCMT"></b-form-input>
            </div>
          </b-col>

          <b-col cols="4" class="d-flex">
            <div class="d-flex col">
              <label for="ngaycap-cmnd" class="align-items-center w-25" v-show="checkboxCMT">Ngày cấp:</label>
              <div v-show="checkboxCMT" class="w-75">
                <b-form-datepicker
                  id="ngaycap-cmnd"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  locale="vi"
                  v-model="data.cmt_NgayCap"
                ></b-form-datepicker>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col cols="2">
            <b-form-checkbox
              id="checkbox-cccd"
              name="checkbox-cccd"
              class="mb-2"
              v-model="checkboxCCCD"
            >
              Căn cước công dân
            </b-form-checkbox>
          </b-col>

          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="cccd" class="align-items-center w-50" v-show="checkboxCCCD">Số CCCD:</label>
              <b-form-input placeholder="" id="cccd" v-show="checkboxCCCD" v-model="data.cccd"></b-form-input>
            </div>
          </b-col>

          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="noicap-cccd" class="align-items-center w-50" v-show="checkboxCCCD">Nơi cấp:</label>
              <b-form-input placeholder="" id="noicap-cccd" v-show="checkboxCCCD" v-model="data.cccd_NoiCap"></b-form-input>
            </div>
          </b-col>

          <b-col cols="4" class="d-flex">
            <div class="d-flex col">
              <label for="ngaycap-cccd" class="align-items-center w-25" v-show="checkboxCCCD">Ngày cấp:</label>
              <div class="w-75" v-show="checkboxCCCD">
                <b-form-datepicker
                  id="ngaycap-cccd"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  locale="vi"
                  v-model="data.cccd_NgayCap"
                ></b-form-datepicker>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col cols="2">
            <b-form-checkbox
              id="checkbox-hc"
              name="checkbox-hc"
              class="mb-2"
              v-model="checkboxHC"
            >
              Hộ chiếu
            </b-form-checkbox>
          </b-col>

          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="hc" class="align-items-center w-50" v-show="checkboxHC">Số hộ chiếu:</label>
              <b-form-input placeholder="" id="hc" v-show="checkboxHC" v-model="data.passport_no"></b-form-input>
            </div>
          </b-col>

          <b-col cols="3" class="d-flex">
            <div class="d-flex col p-0">
              <label for="ngaycap-hc" class="align-items-center w-32" v-show="checkboxHC">Ngày cấp:</label>
              <div v-show="checkboxHC" class="w-68">
                <b-form-datepicker
                  id="ngaycap-hc"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  locale="vi"
                  v-model="data.passport_NgayCap"
                ></b-form-datepicker>
              </div>
            </div>
          </b-col>

          <b-col cols="4" class="d-flex">
            <div class="d-flex col">
              <label for="ngayhethan-hc" class="align-items-center w-25" v-show="checkboxHC">Ngày hết hạn:</label>
              <div v-show="checkboxHC" class="w-75">
                <b-form-datepicker 
                  id="ngayhethan-hc"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  locale="vi"
                  v-model="data.passport_NgayHan"
                ></b-form-datepicker>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div>
        <h2 class="header mt-5 mb-5">THÔNG TIN TÀI KHOẢN NGÂN HÀNG</h2>
        <b-row>
          <b-col cols="3" class="d-flex">
            <label for="accountBank" class="align-items-center w-50"><span class="text-color-red">*</span>Số Tk:</label>
            <b-form-input 
              placeholder="" id="accountBank"
              v-model="$v.data.so_TK.$model"
              :state="validateState('so_TK')"
              aria-describedby="input-so_TK-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-so_TK-feedback" v-if="!$v.data.so_TK.required" >
              Vui lòng nhập số  tài khoản ngân hàng
            </b-form-invalid-feedback>
          </b-col>
          <b-col cols="3" class="d-flex">
            <label for="bank" class="align-items-center w-50"><span class="text-color-red">*</span>Ngân hàng:</label>
            <b-form-input 
              placeholder="" id="bank"
              v-model="$v.data.ngan_hang.$model"
              :state="validateState('ngan_hang')"
              aria-describedby="input-ngan_hang-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-ngan_hang-feedback" v-if="!$v.data.ngan_hang.required" >
              Vui lòng nhập tên ngân hàng
            </b-form-invalid-feedback>
          </b-col>
          <b-col cols="3" class="d-flex">
            <label for="branch" class="align-items-center w-50"><span class="text-color-red">*</span>Chi nhánh:</label>
            <b-form-input 
              placeholder="" id="branch"
              v-model="$v.data.chi_nhanh.$model"
              :state="validateState('chi_nhanh')"
              aria-describedby="input-chi_nhanh-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class="ml-3" id="input-chi_nhanh-feedback" v-if="!$v.data.chi_nhanh.required" >
              Vui lòng nhập tên chi nhánh của ngân hàng
            </b-form-invalid-feedback>
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
      phoneNumberSub: true,
      emailSub: true,
      checkboxCMT: true,
      checkboxCCCD: true,
      checkboxHC: true,
      bankAccountSub: true,
      data: {
        name: this.detail?.name,
        cmt: this.detail?.cmt,
        cmt_NgayCap: this.detail?.cmt_NgayCap,
        cmt_NoiCap: this.detail?.cmt_NoiCap,
        cccd: this.detail?.cccd,
        cccd_NgayCap: this.detail?.cccd_NgayCap,
        cccd_NoiCap: this.detail?.cccd_NoiCap,
        passport_no: this.detail?.passport_no,
        passport_NgayCap: this.detail?.passport_NgayCap,
        passport_NgayHan: this.detail?.passport_NgayHan,
        birthday: this.detail?.birthday,
        address: this.detail?.address,
        phone: this.detail?.phone,
        phone2: this.detail?.phone2,
        email: this.detail?.email,
        email2: this.detail?.email2,
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
      address: {
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
      so_TK: {
        required,
      },
      chi_nhanh: {
        required,
      },
      ngan_hang: {
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
    ...mapGetters(['getErrorChuNha']),
    dataSubmit() {
      const result = {
        name: this.detail?.name,
        cmt: this.detail?.cmt,
        cmt_NgayCap: this.detail?.cmt_NgayCap,
        cmt_NoiCap: this.detail?.cmt_NoiCap,
        cccd: this.detail?.cccd,
        cccd_NgayCap: this.detail?.cccd_NgayCap,
        cccd_NoiCap: this.detail?.cccd_NoiCap,
        passport_no: this.detail?.passport_no,
        passport_NgayCap: this.detail?.passport_NgayCap,
        passport_NgayHan: this.detail?.passport_NgayHan,
        birthday: this.detail?.birthday,
        address: this.detail?.address,
        phone: this.detail?.phone,
        phone2: this.detail?.phone2,
        email: this.detail?.email,
        email2: this.detail?.email2,
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
        cmt: this.detail?.cmt,
        cmt_NgayCap: this.detail?.cmt_NgayCap,
        cmt_NoiCap: this.detail?.cmt_NoiCap,
        cccd: this.detail?.cccd,
        cccd_NgayCap: this.detail?.cccd_NgayCap,
        cccd_NoiCap: this.detail?.cccd_NoiCap,
        passport_no: this.detail?.passport_no,
        passport_NgayCap: this.detail?.passport_NgayCap,
        passport_NgayHan: this.detail?.passport_NgayHan,
        birthday: this.detail?.birthday,
        address: this.detail?.address,
        phone: this.detail?.phone,
        phone2: this.detail?.phone2,
        email: this.detail?.email,
        email2: this.detail?.email2,
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
      this.checkboxCMT = true;
      this.checkboxCCCD = true;
      this.checkboxHC = true;
      this.bankAccountSub = true;
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
      await this.$store.dispatch('updateHost', submitData);
      if (this.getErrorChuNha === 0) {
        this.clearErrorValidate();
        this.cancel()
        this.$emit('updateSelectedListId', []);
        await this.$store.dispatch('getHost', '');
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
