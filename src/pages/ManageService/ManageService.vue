<template>
  <div class="manage-service-container">
    <div class="manage-service-container__header">
      <Header />
    </div>
    <div class="manage-service-container__options">
      <b-form @submit="searchService" >
        <div class="manage-service-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchService"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-service-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-service
          v-if="checkCanDelete"
        >
        </b-icon-trash>
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-else
        >
        </b-icon-trash>
      </div>
    </div>
    <div class="manage-service-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll" />
            </th>
            <th scope="col">Tên dịch vụ</th>
            <th scope="col">Đơn vị</th>
            <th scope="col">Mã dịch vụ</th>
            <th scope="col">Thanh toán định kỳ</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in listServices" :key="index">
            <td>
              <input type="checkbox" :value="service.id" v-model="selectedListService" />
            </td>
            <td>{{ service.name }}</td>
            <td>{{ service.donvi }}</td>
            <td>{{ service.code }}</td>
            <td>
              <div :class="{
                  '-completed' : service.dinhky === true,
                  '-unCompleted' : service.dinhky === false
                }"
              >
                <b>{{ service.dinhky ? 'True' : 'False' }}</b>
              </div>
            </td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailService(service.id)"
                  v-b-modal.modal-detail-service
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-service
                  @click="getSingleIdService(service.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupDeleteService
        :titleModal="constants.SERVICE_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.SERVICE_CONST.ID_POPUP_DELETE"
        :contentModal="constants.SERVICE_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListService"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
    <div>
      <PopupAddService
        :titleModal="constants.SERVICE_CONST.TITLE_POPUP_ADD"
        :idModal="constants.SERVICE_CONST.ID_POPUP_ADD"
      />
    </div>

    <div>
      <PopupDetailService
        :idModal="constants.SERVICE_CONST.ID_POPUP_DETAIL"
        :detail ="detail"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageService/Headers/Header.vue';
import PopupDeleteService from '../../components/ManageService/Popups/PopupDeleteService.vue';
import PopupAddService from '../../components/ManageService/Popups/PopupAddService.vue';
import PopupDetailService from '../../components/ManageService/Popups/PopupDetailService.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageService',
  components: {
    Header,
    PopupDeleteService,
    PopupAddService,
    PopupDetailService,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      canUpdate: false,
      inputSearch: '',
      isSelectedAll: false,
      selectedListService: [],
      detail: {},
      constants,

    };
  },
  watch: {
    selectedListService: {
      handler() {
        if (this.selectedListService.length === this.listIdServce.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistService']),
    listServices() {
      const items = [];
      this.getlistService.forEach((item) => {
        items.push({
          name: item.name,
          donvi: item.don_vi,
          code: item.code,
          dinhky: item.dinh_ky,
          id: item.id,
        });
      });
      return items;
    },
    listIdServce() {
      const result = [];
      this.listServices.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      let result;
      if (this.selectedListService.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setItemsTableWithSearch() {
      this.$store.dispatch('getService', this.search);
    },
    getSingleIdService(id) {
      this.selectedListService = [id];
    },
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListService = this.listIdServce;
      } else {
        this.selectedListService = [];
      }
    },
    updateSelectedListId(value) {
      this.selectedListService = value;
    },
    searchService(event) {
      event.preventDefault();
      this.$store.dispatch('getService', this.inputSearch);
    },
    getDetailService(id) {
      this.selectedListService = [id];
      this.detail = this.getlistService.find((item) => item.id === id);
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-service-container {
  &__header {
    margin-bottom: 12px;
  }
  &__options {
    display: grid;
    grid-template-columns: 50% 50%;
    &__search-form {
      display: flex;
      align-items: center;
      padding: 12px 0px;
      position: relative;
      .search-form-input {
        padding-left: 35px;
      }
      .search-form-icon {
        position: absolute;
        cursor: pointer;
        left: 10px;
      }
    }
    &__button-group {
      margin: 12px 0px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-group-options {
        margin: 0px 5px;
        cursor: pointer;
      }
      .btn-group-options:first-child {
        margin-left: 0px;
      }
      .btn-group-options:last-child {
        margin-right: 0px;
      }
      .-disable {
        opacity: 0.2;
        cursor: default;
      }
    }
  }
  &__table {
    .-completed {
      color: #42cf17;
    }
    .-unCompleted {
      color: #bd6908;
    }
    .show-detail {
      svg {
        border-radius: 50%;
        background: #1a9fed;
        padding: 5px;
        width: 32px;
        height: 32px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang='scss'>
th {
  background: #dcdcdc;
}
td {
  vertical-align: middle !important;
  padding: 10px !important;
}
</style>
