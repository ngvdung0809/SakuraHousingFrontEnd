<template>
  <b-modal :id="idModal" no-close-on-backdrop size="lg" :title="titleModal" @hidden="cancel">
    <div class="popup-add-canho ml-3 mr-3">
      <div class="form-input">
        <label for="name">
          <span class="text-color-required">*</span> Tên căn hộ:
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
            Vui lòng nhập tên căn hộ!
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="address">
          <span class="text-color-required">*</span>Địa chỉ/Số nhà:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="address"
            v-model="$v.address.$model"
            :state="validateState('address')"
            aria-describedby="input-don_vi-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-address-feedback" v-if="!$v.address.required" >
            Vui lòng nhập địa chỉ hoặc số nhà!
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="district">
          <span class="text-color-required">*</span> Chủ nhà:
        </label>
        <div>
          <b-form-select 
            class="b-dropdown" 
            :options="listChuNha"
            v-model="$v.chu_nha.$model"
            :state="validateState('chu_nha')"
            aria-describedby="input-chu_nha-feedback"
          ></b-form-select>
          <b-form-invalid-feedback id="input-chu_nha-feedback" v-if="!$v.chu_nha.required" >
            Vui lòng chọn chủ nhà!
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="toa_nha">
          Tòa nhà:
        </label>
        <b-form-select 
          class="b-dropdown" 
          v-model="toa_nha" 
          :options="listBuilding"
        ></b-form-select>
      </div>
      <div class="form-input">
        <label for="gcn">
          <span class="text-color-required">*</span> Giấy chứng nhận:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="gcn"
            v-model="$v.gcn.$model"
            :state="validateState('gcn')"
            aria-describedby="input-gcn-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-gcn-feedback" v-if="!$v.gcn.required" >
            Vui lòng nhập số giấy chứng nhận
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label for="gcn_NoiCap">
          <span class="text-color-required">*</span> Nơi cấp:
        </label>
        <div>
          <b-form-input
            placeholder=""
            id="gcn_NoiCap"
            v-model="$v.gcn_NoiCap.$model"
            :state="validateState('gcn_NoiCap')"
            aria-describedby="input-gcn_NoiCap-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="input-gcn_NoiCap-feedback" v-if="!$v.gcn_NoiCap.required" >
            Vui lòng nhập nơi cấp giấy chứng nhận
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label>
          <span class="text-color-required">*</span> Ngày cấp:
        </label>
        <div>
          <b-form-datepicker
            class="pr-0"
            id="gcn_NgayCap"
            today-button
            reset-button
            close-button
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="vi"
            v-model="$v.gcn_NgayCap.$model"
            :state="validateState('gcn_NgayCap')"
            aria-describedby="input-gcn_NgayCap-feedback"
          ></b-form-datepicker>
          <b-form-invalid-feedback id="input-gcn_NgayCap-feedback" v-if="!$v.gcn_NgayCap.required" >
            Vui lòng nhập ngày cấp giấy chứng nhận
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="form-input">
        <label>Mô tả:</label>
        <b-form-textarea
          class="form-control-solid"
          placeholder="Nhập mô tả..."
          rows="3"
          no-resize
          max-rows="6"
          v-model="description"
        />
      </div>
      <div class="form-input">
        <label>Ghi chú:</label>
        <b-form-textarea
          class="form-control-solid"
          placeholder="Nhập ghi chú..."
          rows="3"
          no-resize
          max-rows="6"
          v-model="note"
        />
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
      chu_nha: null,
      toa_nha: '',
      address: '',
      gcn: '',
      gcn_NoiCap: '',
      gcn_NgayCap: '',
      description: '',
      note: '',
      constants,
    };
  },
  validations: {
    name: {
      required,
    },
    address: {
      required
    },
    gcn: {
      required
    },
    gcn_NoiCap: {
      required
    },
    gcn_NgayCap: {
      required
    },
    chu_nha: {
      required,
    }
  },
  computed: {
    ...mapGetters(['getlistChuNha', 'getlistToaNha', 'getErrorCodeCanHo']),
    listChuNha() {
      let result = [];
      result = [
        { value: null, text: 'Vui lòng chọn chủ nhà', disabled: true },
        ...this.getlistChuNha.map((item) => ({ value: item.id, text: item.name })),
      ];
      return result
    },
    listBuilding() {
      let result = [];
      result = [
        { value: '', text: 'Vui lòng chọn tòa nhà', disabled: false },
        ...this.getlistToaNha.map((item) => ({ value: item.id, text: item.name })),
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
      this.name = '';
      this.chu_nha = null;
      this.toa_nha = '';
      this.address = '';
      this.gcn = '';
      this.gcn_NoiCap = '';
      this.gcn_NgayCap = '';
      this.description = '';
      this.note = '';
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
        chu_nha: this.chu_nha,
        toa_nha: this.toa_nha,
        address: this.address,
        gcn: this.gcn,
        gcn_NoiCap: this.gcn_NoiCap,
        gcn_NgayCap: this.gcn_NgayCap,
        description: this.description,
        note: this.note,
      };
      // const submitButton = this.$refs.btn_add_service;
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      await this.$store.dispatch('addCanHo', payload);
      if (this.getErrorCodeCanHo === 0) {
        this.cancel()
        await this.$store.dispatch('getAppartment', '');
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
.popup-add-canho {
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
