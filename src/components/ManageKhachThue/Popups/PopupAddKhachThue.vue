<template>
  <b-modal :id="idModal" no-close-on-backdrop :title="titleModal" size="xl" @hidden="cancel">
    <div class="popup-add-guest ml-3 mr-3">
      <div class="justify-content-between">
        <b-row>
          <b-col class="d-flex">
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
          <b-col class="d-flex">
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
          <b-col class="d-flex">
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
          <b-col class="d-flex">
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
        <h2 class="header mt-5 mb-5">THÔNG TIN CÔNG TY ĐẠI DIỆN</h2>
        <b-row>
          <b-col cols="3" class="d-flex">
            <label for="companyName" class="align-items-center w-50">Tên công ty:</label>
            <b-form-input 
              placeholder="" id="companyName"
              v-model="data.company_name"
            ></b-form-input>
          </b-col>
          <b-col cols="3" class="d-flex">
            <label for="companyPhone" class="align-items-center w-50">Số điện thoại:</label>
            <b-form-input 
              placeholder="" id="companyPhone"
              v-model="data.company_phone"
            ></b-form-input>
          </b-col>
          <b-col cols="3" class="d-flex">
            <label for="companyFax" class="align-items-center w-50">Số fax:</label>
            <b-form-input 
              placeholder="" id="companyFax"
              v-model="data.company_fax"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="companyTaxCode" class="align-items-center w-50">Mã số thuế:</label>
              <b-form-input placeholder="" id="companyTaxCode" v-model="data.company_tax_code"></b-form-input>
            </div>
          </b-col>
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="companyRep" class="align-items-center w-50">Người đại diện:</label>
              <b-form-input placeholder="" id="companyRep" v-model="data.company_rep"></b-form-input>
            </div>
          </b-col>
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="companyRepRole" class="align-items-center w-50">Chức vụ:</label>
              <b-form-input placeholder="" id="companyRepRole" v-model="data.company_rep_role"></b-form-input>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-5">
          <b-col class="d-flex">
            <label for="textarea-address" class="align-items-center w-25">Địa chỉ:</label>
            <b-form-textarea
              id="textarea-address"
              placeholder="Nhập địa chỉ"
              rows="3"
              max-rows="6"
              v-model="data.address"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </div>

      <div>
        <h2 class="header mt-5 mb-5">THÔNG TIN TRỢ LÝ</h2>
        <b-row class="mt-5">
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="assistantName" class="align-items-center w-50">Tên trợ lý:</label>
              <b-form-input placeholder="" id="assistantName" v-model="data.assistant_name"></b-form-input>
            </div>
          </b-col>
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="assistantPhone" class="align-items-center w-50">Số điện thoại:</label>
              <b-form-input placeholder="" id="assistantPhone" v-model="data.assistant_phone"></b-form-input>
            </div>
          </b-col>
          <b-col cols="3" class="d-flex">
            <div class="d-flex">
              <label for="assistantEmail" class="align-items-center w-50">Email</label>
              <b-form-input placeholder="Nhập email" id="assistantEmail" v-model="data.assistant_email"></b-form-input>
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
        Tạo
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
  },
  mixins: [validationMixin],
  data() {
    return {
      checkboxCMT: false,
      checkboxCCCD: false,
      checkboxHC: false,
      data: {
        name: '',
        cmt: '',
        cmt_NgayCap: '',
        cmt_NoiCap: '',
        cccd: '',
        cccd_NgayCap: '',
        cccd_NoiCap: '',
        passport_no: '',
        passport_NgayCap: '',
        passport_NgayHan: '',
        birthday: '',
        address: '',
        phone: '',
        email: '',
        company_name: '',
        company_phone: '',
        company_fax: '',
        company_address: '',
        company_tax_code: '',
        company_rep: '',
        company_rep_role: '',
        assistant_name: '',
        assistant_phone: '',
        assistant_email: '',
        note: '',
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
  computed: {
    ...mapGetters(['getErrorGuest'])
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.data[name];
      return $dirty ? !$error : null;
    },
    deleteNullValue(payload, key) {
      const payloadNew = payload;
      key.forEach((item) => {
        if (!payloadNew[item]) {
          delete payloadNew[item];
        }
      });
    },
    clearData() {
      this.data = {
        name: '',
        cmt: '',
        cmt_NgayCap: '',
        cmt_NoiCap: '',
        cccd: '',
        cccd_NgayCap: '',
        cccd_NoiCap: '',
        passport_no: '',
        passport_NgayCap: '',
        passport_NgayHan: '',
        birthday: '',
        address: '',
        phone: '',
        email: '',
        company_name: '',
        company_phone: '',
        company_fax: '',
        company_address: '',
        company_tax_code: '',
        company_rep: '',
        company_rep_role: '',
        assistant_name: '',
        assistant_phone: '',
        assistant_email: '',
        note: '',
      };
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
      const payload = this.data;
      const key = ['birthday', 'cccd_NgayCap', 'cmt_NgayCap', 'passport_NgayCap', 'passport_NgayHan']
      this.deleteNullValue(payload, key)
      // const submitButton = this.$refs.btn_add_chunha;
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('addGuest', payload);
      if (this.getErrorGuest === 0) {
        this.cancel()
        await this.$store.dispatch('getGuest', '');
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
