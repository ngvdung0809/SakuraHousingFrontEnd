/* eslint-disable no-unused-expressions */ /* eslint-disable no-unused-expressions */
<template>
  <b-modal
    :id="idModal"
    size="xl"
    title="Tạo bộ hợp đồng"
    no-close-on-backdrop=""
    hide-header-close
    no-close-on-esc
    :key="typeSubmit"
  >
    <template #modal-header>
      <!-- Emulate built in modal header close button action -->
      <h5>Tạo bộ hợp đồng</h5>
      <b-button size="md" variant="outline-light" @click="cancel()">
        <b-icon icon="x" aria-hidden="true"></b-icon>
      </b-button>
    </template>
    <div class="card card-custom">
      <div class="card-body p-0">
        <!--begin: Wizard-->
        <div
          class="wizard wizard-2"
          id="kt_wizard_v2"
          data-wizard-state="step-first"
          data-wizard-clickable="true"
        >
          <!--begin: Wizard Nav -->
          <div class="wizard-nav border-right py-8 px-8 py-lg-20 px-lg-10">
            <div class="wizard-steps">
              <div
                class="wizard-step"
                v-for="step in filterStateStep"
                :key="step.id"
                :data-wizard-state="currentStep === step.id ? 'current' : 'none'"
                :style="{
                  backgroundColor: currentStep === step.id ? '#F3F6F9' : 'transparent',
                }"
              >
                <div class="wizard-wrapper">
                  <div class="wizard-icon">
                    <span class="svg-icon svg-icon-2x">
                      <inline-svg :src="step.icon" />
                    </span>
                  </div>
                  <div class="wizard-label">
                    <h3 class="wizard-title">{{ step.name }}</h3>
                    <div class="wizard-desc">{{ step.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end: Wizard Nav -->

          <!--begin: Wizard Body -->
          <div class="wizard-body py-8 px-8 py-lg-20 px-lg-10">
            <!--begin: Wizard Form-->
            <div class="row">
              <div class="offset-xxl-2 col-xxl-8">
                <div v-if="currentStep === 1">
                  <b-form-group label="Tên bộ hợp đồng">
                    <b-form-input
                      type="text"
                      v-model="$v.basicForm.name.$model"
                      :state="validateState('basicForm', 'name')"
                      class="form-control form-control-solid form-control-lg"
                      name="fname"
                      aria-describedby="input-1-live-feedback"
                      placeholder="Nhập tên bộ hợp đồng"
                    />
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.basicForm.name.required"
                    >
                      Xin hãy nhật tên bộ hợp đồng
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-else-if="!$v.basicForm.name.minLength"
                    >
                      Độ dài tối thiểu của tên bộ hợp đồng là 4
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-else-if="!$v.basicForm.name.maxLength"
                    >
                      Độ dài tối đa của tên bộ hợp đồng là 32
                    </b-form-invalid-feedback>
                    <!-- <div id="input-1-live-feedback" v-else style="height: 1.4rem" /> -->
                  </b-form-group>
                  <b-form-group label="Nhân viên:">
                    <b-form-select
                      v-model="$v.basicForm.employee.$model"
                      :state="validateState('basicForm', 'employee')"
                      class="form-control form-control-solid form-control-lg"
                      :options="listEmployee"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.basicForm.employee.required"
                      >Xin hãy chọn nhân viên</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group label="Người thuê nhà:">
                    <b-form-select
                      v-model="$v.basicForm.endUser.$model"
                      :state="validateState('basicForm', 'endUser')"
                      class="form-control form-control-solid form-control-lg"
                      :options="listEndUser"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.basicForm.endUser.required"
                      >Xin hãy chọn khách thuê</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <b-form-group label="Căn hộ:">
                    <b-form-select
                      v-model="$v.basicForm.apartment.$model"
                      :state="validateState('basicForm', 'apartment')"
                      class="form-control form-control-solid form-control-lg"
                      :options="listApartment"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.basicForm.apartment.required"
                      >Xin hãy chọn căn hộ</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <div class="form-group">
                    <label>Loại tiền tệ</label>
                    <b-form-select
                      :options="listTypeCurrency"
                      v-model="basicForm.typeCurrency"
                      class="form-control form-control-solid form-control-lg"
                    ></b-form-select>
                  </div>
                  <div class="form-group d-flex">
                    <label
                      class="checkbox checkbox-lg checkbox-lg checkbox-single flex-shrink-0 mr-4"
                    >
                      <input type="checkbox" v-model="isBrokerageContract" :disabled="typeSubmit === 'updateContract'"/>
                      <span class="mr-2"></span>
                      Hợp đồng môi giới
                    </label>
                    <label
                      class="checkbox checkbox-lg checkbox-lg checkbox-single flex-shrink-0 mr-4"
                    >
                      <input type="checkbox" v-model="isServiceContract" :disabled="typeSubmit === 'updateContract'" />
                      <span class="mr-2"></span>
                      Hợp đồng dịch vụ
                    </label>
                  </div>
                </div>
                <div v-if="currentStep === 2">
                  <!-- <div class="form-group">
                    <label>Khách thuê:</label>
                    <b-form-select
                      class="form-control form-control-solid form-control-lg"
                    ></b-form-select>
                  </div> -->
                  <div class="row">
                    <div class="col-xl-6">
                      <b-form-group label="Ngày bắt đầu hợp đồng:">
                        <b-form-datepicker
                          v-model="$v.loanForm.dayStartContract.$model"
                          :max="loanForm.dayEndContract"
                          :date-format-options="{
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          }"
                          :state="validateState('loanForm', 'dayStartContract')"
                          class="form-control form-control-solid form-control-lg"
                        ></b-form-datepicker>
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.dayStartContract.required"
                          >Xin hãy chọn ngày bắt đầu hợp đồng</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                    <div class="col-xl-6">
                      <b-form-group label="Ngày kết thúc hợp đồng:">
                        <b-form-datepicker
                          v-model="$v.loanForm.dayEndContract.$model"
                          :state="validateState('loanForm', 'dayEndContract')"
                          :date-format-options="{
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          }"
                          class="form-control form-control-solid form-control-lg"
                          :min="loanForm.dayStartContract"
                        ></b-form-datepicker>
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.dayEndContract.required"
                          >Xin hãy chọn ngày kết thúc hợp đồng</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-6">
                      <b-form-group label="Ngày nhận nhà:">
                        <b-form-datepicker
                          v-model="$v.loanForm.dayReceive.$model"
                          :state="validateState('loanForm', 'dayReceive')"
                          :date-format-options="{
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          }"
                          class="form-control form-control-solid form-control-lg"
                          :max="loanForm.dayReturn"
                        ></b-form-datepicker>
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.dayReceive.required"
                          >Xin hãy chọn ngày nhận nhà</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                    <div class="col-xl-6">
                      <b-form-group label="Ngày trả nhà:">
                        <b-form-datepicker
                          v-model="$v.loanForm.dayReturn.$model"
                          :state="validateState('loanForm', 'dayReturn')"
                          :date-format-options="{
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                          }"
                          class="form-control form-control-solid form-control-lg"
                          :min="loanForm.dayReceive"
                        ></b-form-datepicker>
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.dayReturn.required"
                          >Xin hãy chọn ngày trả nhà</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                  </div>
                  <b-form-group label="Kỳ thanh toán:">
                    <b-form-input
                      type="text"
                      v-model="$v.loanForm.periodPayment.$model"
                      :state="validateState('loanForm', 'periodPayment')"
                      class="form-control form-control-solid form-control-lg"
                      name="fname"
                      aria-describedby="input-1-live-feedback"
                      placeholder="Nhập kỳ thanh toán"
                    />
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.loanForm.periodPayment.required"
                      >Xin hãy nhập kì thanh toán</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.loanForm.periodPayment.numeric"
                      >Xin hãy nhập dạng số</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.loanForm.periodPayment.between"
                      >Bạn đã nhập vượt quá kỳ thanh toán (1 -
                      32)</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <div class="row">
                    <div class="col-xl-6">
                      <b-form-group label="Gía thuê:">
                        <b-form-input
                          type="text"
                          v-model="$v.loanForm.priceContract.$model"
                          :state="validateState('loanForm', 'priceContract')"
                          class="form-control form-control-solid form-control-lg"
                          name="fname"
                          aria-describedby="input-1-live-feedback"
                          placeholder="Nhập giá thuê theo tháng"
                        />
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.priceContract.required"
                          >Xin hãy nhập giá thuê theo tháng</b-form-invalid-feedback
                        >
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.priceContract.numeric"
                          >Xin hãy nhập dạng số</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                    <div class="col-xl-6">
                      <b-form-group label="Tiền cọc trước:">
                        <b-form-input
                          type="text"
                          v-model="$v.loanForm.deposits.$model"
                          :state="validateState('loanForm', 'deposits')"
                          class="form-control form-control-solid form-control-lg"
                          name="fname"
                          aria-describedby="input-1-live-feedback"
                          placeholder="Nhập số tiền cọc trước"
                        />
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.loanForm.deposits.numeric"
                          >Xin hãy nhập dạng số</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-6">
                      <div class="form-group">
                        <label>Điều kiện gia hạn:</label>
                        <b-form-textarea
                          class="form-control-solid"
                          placeholder="Nhập thêm điều kiện gia hạn"
                          rows="3"
                          v-model="loanForm.conditionRenewal"
                          no-resize
                          max-rows="6"
                        />
                      </div>
                    </div>
                    <div class="col-xl-6">
                      <div class="form-group">
                        <label>Ghi chú:</label>
                        <b-form-textarea
                          class="form-control-solid"
                          placeholder="Nhập thêm ghi chú"
                          v-model="loanForm.note"
                          rows="3"
                          no-resize
                          max-rows="6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="currentStep === 3 && isBrokerageContract">
                  <b-form-group label="Tiền môi giới:">
                    <b-form-input
                      type="text"
                      v-model="$v.brokerageContractForm.brokerageMoney.$model"
                      :state="validateState('brokerageContractForm', 'brokerageMoney')"
                      class="form-control form-control-solid form-control-lg"
                      name="fname"
                      aria-describedby="input-1-live-feedback"
                      placeholder="Nhập số tiền môi giới"
                    />
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.brokerageContractForm.brokerageMoney.required"
                      >Xin hãy nhập số tiền môi giới</b-form-invalid-feedback
                    >
                    <b-form-invalid-feedback
                      id="input-1-live-feedback"
                      v-if="!$v.brokerageContractForm.brokerageMoney.numeric"
                      >Xin hãy nhập dạng số</b-form-invalid-feedback
                    >
                  </b-form-group>
                  <div class="form-group">
                    <label>Ghi chú:</label>
                    <b-form-textarea
                      class="form-control-solid"
                      v-model="brokerageContractForm.note"
                      placeholder="Nhập thêm ghi chú"
                      rows="6"
                      max-rows="6"
                      no-resize
                    />
                  </div>
                </div>
                <div v-if="currentStep === filterStateStep.length && isServiceContract">
                  <div class="row">
                    <div class="col-xl-6">
                      <b-form-group label="Tiền thực lĩnh:">
                        <b-form-input
                          type="text"
                          v-model="$v.serviceForm.moneyReceive.$model"
                          :state="validateState('serviceForm', 'moneyReceive')"
                          class="form-control form-control-solid form-control-lg"
                          name="fname"
                          aria-describedby="input-1-live-feedback"
                          placeholder="Nhập số tiền thực lĩnh"
                        />
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.serviceForm.moneyReceive.required"
                          >Xin hãy nhập số tiền thực lĩnh</b-form-invalid-feedback
                        >
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.serviceForm.moneyReceive.numeric"
                          >Xin hãy nhập dạng số</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                    <div class="col-xl-6">
                      <b-form-group label="Tiền dịch vụ:">
                        <b-form-input
                          type="text"
                          v-model="$v.serviceForm.moneyService.$model"
                          :state="validateState('serviceForm', 'moneyService')"
                          class="form-control form-control-solid form-control-lg"
                          name="fname"
                          aria-describedby="input-1-live-feedback"
                          placeholder="Nhập số tiền dịch vụ"
                        />
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.serviceForm.moneyService.required"
                          >Xin hãy nhập số tiền dịch vụ</b-form-invalid-feedback
                        >
                        <b-form-invalid-feedback
                          id="input-1-live-feedback"
                          v-if="!$v.serviceForm.moneyService.numeric"
                          >Xin hãy nhập dạng số</b-form-invalid-feedback
                        >
                      </b-form-group>
                    </div>
                  </div>
                  <b-form-group label="Thời gian thanh toán:">
                    <b-form-datepicker
                      v-model="serviceForm.datePayment"
                      :state="validateState('loanForm', 'dayEndContract')"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      class="form-control form-control-solid form-control-lg"
                    ></b-form-datepicker>
                  </b-form-group>
                  <div class="row">
                    <div class="col-4">
                      <label>Dịch vụ:</label>
                    </div>
                    <div class="col-4">
                      <label>Định mức:</label>
                    </div>
                    <div class="col-4">
                      <label>Kỳ thanh toán</label>
                    </div>
                    <div
                      class="w-100 d-flex mb-4"
                      v-for="(item, index) in $v.serviceForm.listService.$each.$iter"
                      :key="index"
                    >
                      <div class="col-4">
                        <b-form-group>
                          <b-form-select
                            v-model="item.nameService.$model"
                            :state="
                              validateState(
                                'serviceForm',
                                'listService',
                                index,
                                'nameService'
                              )
                            "
                            class="form-control form-control-solid form-control-lg"
                            :options="listService"
                          ></b-form-select>
                          <b-form-invalid-feedback
                            id="input-1-live-feedback"
                            v-if="!item.nameService.required"
                            >Xin hãy dịch vụ tương ứng</b-form-invalid-feedback
                          >
                        </b-form-group>
                      </div>
                      <div class="col-4">
                        <input
                          v-model="serviceForm.listService[index].quota"
                          type="text"
                          class="form-control form-control-solid form-control-lg"
                          name="fname"
                          placeholder="Nhập định mức của dịch vụ"
                        />
                      </div>
                      <div class="col-4">
                        <b-form-group>
                          <b-form-input
                            type="text"
                            v-model="item.periodPayment.$model"
                            :state="
                              validateState(
                                'serviceForm',
                                'listService',
                                index,
                                'periodPayment'
                              )
                            "
                            class="form-control form-control-solid form-control-lg"
                            name="fname"
                            aria-describedby="input-1-live-feedback"
                            placeholder="Nhập kỳ thanh toán của dịch vụ"
                          />
                          <b-form-invalid-feedback
                            id="input-1-live-feedback"
                            v-if="!item.periodPayment.required"
                            >Xin hãy nhập kỳ thanh toán của dịch
                            vụ</b-form-invalid-feedback
                          >
                          <b-form-invalid-feedback
                            id="input-1-live-feedback"
                            v-if="!item.periodPayment.numeric"
                            >Xin hãy nhập dạng số</b-form-invalid-feedback
                          >
                          <b-form-invalid-feedback
                            id="input-1-live-feedback"
                            v-if="!item.periodPayment.between"
                            >Bạn đã nhập vượt quá kỳ thanh toán (1 -
                            32)</b-form-invalid-feedback
                          >
                        </b-form-group>
                      </div>
                      <b-button style="height: 67%" @click="deleteService(index)" v-if="serviceForm.listService.length > 1">
                        <span class="svg-icon svg-icon-2x d-flex align-items-center mr-0">
                          <inline-svg src="media/svg/icons/Home/Trash.svg" />
                        </span>
                      </b-button>
                    </div>
                    <div class="w-100 d-flex justify-content-end pr-4">
                      <b-button
                        size="sm"
                        variant="outline-primary"
                        @click="addMoreService"
                      >
                        Thêm dịch vụ
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
              <!--end: Wizard-->
            </div>
          </div>
          <!--end: Wizard Body -->
        </div>
        <!--end: Wizard-->
      </div>
    </div>
    <template #modal-footer>
      <div class="d-flex">
        <div class="mr-2">
          <button
            @click="backStep"
            class="btn btn-light-primary font-weight-bold text-uppercase px-9 py-4"
            data-wizard-type="action-prev"
          >
            Quay Lại
          </button>
        </div>
        <div>
          <button
            type="submit"
            @click.stop.prevent="onSubmit"
            class="btn btn-primary font-weight-bold text-uppercase px-9 py-4"
            data-wizard-type="action-next"
          >
            {{ currentStep === filterStateStep.length ? "Submit" : "Tiếp theo" }}
          </button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  minLength,
  required,
  maxLength,
  numeric,
  between,
} from 'vuelidate/lib/validators';
import api from '../../../core/services/api/api';

export default {
  name: 'DialogCreateContract',
  mixins: [validationMixin],
  components: {},
  props: ['idModal', 'detailContract'],
  data() {
    return {
      typeSubmit: 'createContract',
      currentStep: 1,
      listEmployee: [],
      listEndUser: [],
      listApartment: [],
      listTypeCurrency: [
        {
          value: '1',
          text: 'VNĐ',
        },
        {
          value: '2',
          text: 'USD',
        },
        {
          value: '3',
          text: 'JPN',
        },
      ],
      listService: [],
      isBrokerageContract: false,
      isServiceContract: false,
      idContract: null,
      basicForm: {
        name: '',
        apartment: null,
        employee: null,
        endUser: null,
        typeCurrency: '1',
      },
      loanForm: {
        dayStartContract: null,
        dayEndContract: null,
        dayReceive: null,
        dayReturn: null,
        periodPayment: null,
        priceContract: null,
        deposits: null,
        conditionRenewal: null,
        note: null,
      },
      brokerageContractForm: {
        brokerageMoney: null,
        note: null,
      },
      serviceForm: {
        moneyReceive: null,
        moneyService: null,
        datePayment: null,
        listService: [
          {
            nameService: null,
            quota: null,
            periodPayment: null,
          },
        ],
      },
    };
  },
  validations: {
    basicForm: {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
      },
      employee: {
        required,
      },
      apartment: {
        required,
      },
      endUser: {
        required,
      },
    },
    loanForm: {
      dayStartContract: {
        required,
      },
      dayEndContract: {
        required,
      },
      dayReturn: {
        required,
      },
      dayReceive: {
        required,
      },
      periodPayment: {
        required,
        numeric,
        between: between(1, 32),
      },
      priceContract: {
        required,
        numeric,
      },
      deposits: {
        numeric,
      },
      conditionRenewal: {
        maxLength: maxLength(255),
      },
      note: {
        maxLength: maxLength(255),
      },
    },
    brokerageContractForm: {
      brokerageMoney: {
        required,
        numeric,
      },
    },
    serviceForm: {
      moneyReceive: {
        required,
        numeric,
      },
      moneyService: {
        required,
        numeric,
      },
      listService: {
        $each: {
          nameService: {
            required,
          },
          periodPayment: {
            required,
            numeric,
            between: between(1, 32),
          },
        },
      },
    },
  },
  computed: {
    filterStateStep() {
      const cloneStateStep = [
        {
          id: 1,
          name: 'Thông tin cơ bản',
          description: 'Chi tiết thông tin cơ bản',
          icon: 'media/svg/icons/General/User.svg',
        },
        {
          id: 2,
          name: 'Hợp đồng cho thuê',
          description: 'Chi tiết thông tin hợp đồng cho thuê',
          icon: 'media/svg/icons/Map/Compass.svg',
        },
      ];
      if (this.isBrokerageContract) {
        cloneStateStep.push({
          id: cloneStateStep.length + 1,
          name: 'Hợp đồng môi giới',
          description: 'Chi tiết thông tin hợp đồng môi giới',
          icon: 'media/svg/icons/General/Thunder-move.svg',
        });
      }
      if (this.isServiceContract) {
        cloneStateStep.push({
          id: cloneStateStep.length + 1,
          name: 'Hợp đồng dịch vụ',
          description: 'Chi tiết thông tin hợp đồng dịch dịch vụ',
          icon: 'media/svg/icons/Map/Position.svg',
        });
      }
      return cloneStateStep;
    },
    getNameCurrentForm() {
      switch (this.currentStep) {
        case 1:
          return 'basicForm';
        case 2:
          return 'loanForm';
        case 3:
          return this.isBrokerageContract ? 'brokerageContractForm' : 'serviceForm';
        case 4:
          return 'serviceForm';
        default:
          return '';
      }
    },
  },
  watch: {
    detailContract(val) {
      if (val) {
        this.typeSubmit = 'updateContract';
        this.idContract = val.id;
        val.hd_moi_giois.length > 0
          ? (this.isBrokerageContract = true)
          : (this.isBrokerageContract = false);
        val.hd_dich_vus.length > 0
          ? (this.isServiceContract = true)
          : (this.isServiceContract = false);
        this.basicForm = {
          name: val.name,
          apartment: val.can_ho.id,
          employee: val.nhan_vien.id,
          endUser: val.hd_thues[0]?.khach_thue?.id,
          typeCurrency: val.hd_thues[0]?.ngoai_te,
        };
        this.loanForm = {
          dayStartContract: val.hd_thues[0]?.start_date,
          dayEndContract: val.hd_thues[0]?.end_date,
          dayReceive: val.hd_thues[0]?.ngay_nhan,
          dayReturn: val.hd_thues[0]?.ngay_tra,
          periodPayment: val.hd_thues[0]?.ky_tt,
          priceContract: val.hd_thues[0]?.gia_thue_per_month,
          deposits: val.hd_thues[0]?.tien_dat_coc,
          conditionRenewal: val.hd_thues[0]?.dk_gia_han,
          note: val.hd_thues[0]?.note,
        };
        this.brokerageContractForm = {
          brokerageMoney: val.hd_moi_giois[0]?.tien_moi_gioi,
          note: val.hd_moi_giois[0]?.note,
        };
        this.serviceForm = {
          moneyReceive: val.hd_dich_vus[0]?.tien_thuc_linh,
          moneyService: val.hd_dich_vus[0]?.tien_dich_vu,
          datePayment: val.hd_dich_vus[0]?.thoi_gian_thanh_toan,
          listService: val.hd_thues[0]?.services.map((_service) => ({
            nameService: _service.dich_vu.id,
            quota: _service.dinh_muc,
            periodPayment: _service.ky_tt,
          })),
        };
      }
    },
  },
  methods: {
    validateState(form, name, index, subName) {
      if (index) {
        const { $dirty, $error } = this.$v[form][name].$each.$iter[index][subName];
        return $dirty ? !$error : null;
      }
      const { $dirty, $error } = this.$v[form][name];
      return $dirty ? !$error : null;
    },
    async getListEmployees() {
      const res = await api('getAccount', '');
      if (res.success) {
        this.listEmployee = [
          { value: null, text: 'Hãy chọn nhân viên', disabled: true },
          ...res.data.data.map((item) => ({ value: item.id, text: item.full_name })),
        ];
      }
    },
    async getListEndUser() {
      const res = await api('getKhachThue', '');
      if (res.success) {
        this.listEndUser = [
          { value: null, text: 'Hãy chọn khách thuê', disabled: true },
          ...res.data.data.map((item) => ({ value: item.id, text: item.name })),
        ];
      }
    },
    async getListApartment() {
      const res = await api('getCanHo', '');
      if (res.success) {
        this.listApartment = [
          { value: null, text: 'Hãy chọn căn hộ', disabled: true },
          ...res.data.data.map((item) => ({ value: item.id, text: item.name })),
        ];
      }
    },
    async getListService() {
      const res = await api('getService', '');
      if (res.success) {
        this.listService = [
          { value: null, text: 'Hãy chọn dịch vụ', disabled: true },
          ...res.data.data.map((item) => ({ value: item.id, text: item.name })),
        ];
      }
    },
    async onSubmit() {
      // submitButton.classList.add('spinner', 'spinner-light', 'spinner-right');
      this.$v[this.getNameCurrentForm].$touch();
      if (this.$v[this.getNameCurrentForm].$anyError) {
        return;
      }
      if (
        this.currentStep === 2
        && !this.isBrokerageContract
        && !this.isServiceContract
      ) {
        const response = await api(this.typeSubmit, {
          id: this.idContract,
          data: {
            name: this.basicForm.name,
            can_ho: this.basicForm.apartment,
            nhan_vien: this.basicForm.employee,
            hd_thue: {
              khach_thue: this.basicForm.endUser,
              start_date: this.loanForm.dayStartContract,
              end_date: this.loanForm.dayEndContract,
              ngay_tra: this.loanForm.dayReturn,
              ngay_nhan: this.loanForm.dayReceive,
              dk_gia_han: this.loanForm.conditionRenewal,
              gia_thue_per_month: Number(this.loanForm.priceContract),
              ky_tt: Number(this.loanForm.periodPayment),
              tien_dat_coc: Number(this.loanForm.deposits),
              note: this.loanForm.note,
              ngoai_te: this.basicForm.typeCurrency,
            },
          },
        });
        if (response.data.error_code === 0) {
          this.makeToastMessage('Thành công', 'success');
        } else {
          this.makeToastMessage('Thất bại', 'success');
        }
      }
      if (this.currentStep === 3 && this.isBrokerageContract && !this.isServiceContract) {
        const response = await api(this.typeSubmit, {
          id: this.idContract,
          data: {
            name: this.basicForm.name,
            can_ho: this.basicForm.apartment,
            nhan_vien: this.basicForm.employee,
            hd_thue: {
              khach_thue: this.basicForm.endUser,
              start_date: this.loanForm.dayStartContract,
              end_date: this.loanForm.dayEndContract,
              ngay_tra: this.loanForm.dayReturn,
              ngay_nhan: this.loanForm.dayReceive,
              dk_gia_han: this.loanForm.conditionRenewal,
              gia_thue_per_month: Number(this.loanForm.priceContract),
              ky_tt: Number(this.loanForm.periodPayment),
              tien_dat_coc: Number(this.loanForm.deposits),
              note: this.loanForm.note,
              ngoai_te: this.basicForm.typeCurrency,
            },
            hd_moi_gioi: {
              note: this.brokerageContractForm.note,
              tien_moi_gioi: Number(this.brokerageContractForm.brokerageMoney),
            },
          },
        });
        if (response.data.error_code === 0) {
          this.makeToastMessage('Thành công', 'success');
        } else {
          this.makeToastMessage('Thất bại', 'success');
        }
      }
      if (this.currentStep === 3 && !this.isBrokerageContract && this.isServiceContract) {
        const response = await api(this.typeSubmit, {
          id: this.idContract,
          data: {
            name: this.basicForm.name,
            can_ho: this.basicForm.apartment,
            nhan_vien: this.basicForm.employee,
            hd_thue: {
              khach_thue: this.basicForm.endUser,
              start_date: this.loanForm.dayStartContract,
              end_date: this.loanForm.dayEndContract,
              ngay_tra: this.loanForm.dayReturn,
              ngay_nhan: this.loanForm.dayReceive,
              dk_gia_han: this.loanForm.conditionRenewal,
              gia_thue_per_month: Number(this.loanForm.priceContract),
              ky_tt: Number(this.loanForm.periodPayment),
              tien_dat_coc: Number(this.loanForm.deposits),
              note: this.loanForm.note,
              ngoai_te: this.basicForm.typeCurrency,
              dich_vu: [
                ...this.serviceForm.listService.map((service) => ({
                  dich_vu: service.nameService,
                  ky_tt: Number(service.periodPayment),
                  dinh_muc: Number(service.quota),
                })),
              ],
            },
            hd_dich_vu: {
              tien_thuc_linh: Number(this.serviceForm.moneyReceive),
              tien_dich_vu: Number(this.serviceForm.moneyService),
              thoi_gian_thanh_toan: this.serviceForm.datePayment,
            },
          },
        });
        if (response.data.error_code === 0) {
          this.makeToastMessage('Thành công', 'success');
        } else {
          this.makeToastMessage('Thất bại', 'success');
        }
      }
      if (this.currentStep === 4 && this.isBrokerageContract && this.isServiceContract) {
        const response = await api(this.typeSubmit, {
          id: this.idContract,
          data: {
            name: this.basicForm.name,
            can_ho: this.basicForm.apartment,
            nhan_vien: this.basicForm.employee,
            hd_thue: {
              khach_thue: this.basicForm.endUser,
              start_date: this.loanForm.dayStartContract,
              end_date: this.loanForm.dayEndContract,
              ngay_tra: this.loanForm.dayReturn,
              ngay_nhan: this.loanForm.dayReceive,
              dk_gia_han: this.loanForm.conditionRenewal,
              gia_thue_per_month: Number(this.loanForm.priceContract),
              ky_tt: Number(this.loanForm.periodPayment),
              tien_dat_coc: Number(this.loanForm.deposits),
              note: this.loanForm.note,
              ngoai_te: this.basicForm.typeCurrency,
              dich_vu: [
                ...this.serviceForm.listService.map((service) => ({
                  dich_vu: service.nameService,
                  ky_tt: Number(service.periodPayment),
                  dinh_muc: Number(service.quota),
                })),
              ],
            },
            hd_moi_gioi: {
              note: this.brokerageContractForm.note,
              tien_moi_gioi: Number(this.brokerageContractForm.brokerageMoney),
            },
            hd_dich_vu: {
              tien_thuc_linh: Number(this.serviceForm.moneyReceive),
              tien_dich_vu: Number(this.serviceForm.moneyService),
              thoi_gian_thanh_toan: this.serviceForm.datePayment,
            },
          },
        });
        if (response.data.error_code === 0) {
          this.makeToastMessage('Thành công', 'success');
        } else {
          this.makeToastMessage('Thất bại', 'success');
        }
      }
      if (this.currentStep === this.filterStateStep.length) {
        await this.$store.dispatch('getContract', '');
        this.$emit('updateSelectedListId', []);
        this.resetData();
        this.cancel();
        return;
      }
      this.currentStep += 1;
    },
    backStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1;
      }
    },
    addMoreService() {
      this.serviceForm.listService.push({
        nameService: null,
        quota: null,
        periodPayment: null,
      });
    },
    deleteService(indexService) {
      this.serviceForm.listService.splice(indexService, 1);
    },
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    cancel() {
      this.resetData();
      this.$bvModal.hide(this.idModal);
    },
    resetData() {
      this.basicForm = {
        name: '',
        apartment: null,
        employee: null,
        endUser: null,
        typeCurrency: '1',
      };
      this.loanForm = {
        dayStartContract: null,
        dayEndContract: null,
        dayReceive: null,
        dayReturn: null,
        periodPayment: null,
        priceContract: null,
        deposits: null,
        conditionRenewal: null,
        note: null,
      };
      this.brokerageContractForm = {
        brokerageMoney: null,
        note: null,
      };
      this.serviceForm = {
        moneyReceive: null,
        moneyService: null,
        datePayment: null,
        listService: [
          {
            nameService: null,
            quota: null,
            periodPayment: null,
          },
        ],
      };
      this.currentStep = 1;
      this.typeSubmit = 'createContract';
      this.$v.$reset();
      this.isBrokerageContract = false;
      this.isServiceContract = false;
    },
  },
  created() {
    this.getListEmployees();
    this.getListEndUser();
    this.getListApartment();
    this.getListService();
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-2.scss";
.modal-body {
  padding: 0px;
}
.custom-select {
  height: calc(1.5em + 1.65rem + 2px);
  padding: 0.825rem 1.42rem;
}
</style>
