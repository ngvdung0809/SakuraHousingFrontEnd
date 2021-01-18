<template>
  <div class="manage-tenant-container">
    <div class="manage-tenant-container__header">
      <Header />
    </div>
    <div class="manage-tenant-container__options">
      <b-form @submit="searchTenant" >
        <div class="manage-tenant-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchTenant"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-tenant-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-tenant
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
    <div class="manage-tenant-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll"/>
            </th>
            <th scope="col">Tên công ty</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Email</th>
            <th scope="col">Người đại diện</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tenant, index) in listTenant" :key="index">
            <td>
              <input type="checkbox" :value="tenant.id" v-model="selectedListTenant" />
            </td>
            <td>{{ tenant.name }}</td>
            <td>{{ tenant.phone }}</td>
            <td>{{ tenant.email }}</td>
            <td>{{ tenant.rep }}</td>
            <td>{{ tenant.address }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailTenant(tenant.id)"
                  v-b-modal.modal-detail-tenant
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-tenant
                  @click="getSingleTenantId(tenant.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <PopupDeleteTenant
        :titleModal="constants.TENANT_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.TENANT_CONST.ID_POPUP_DELETE"
        :contentModal="constants.TENANT_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListTenant"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
    <div>
      <PopupAddTenant
        :titleModal="constants.TENANT_CONST.TITLE_POPUP_ADD"
        :idModal="constants.TENANT_CONST.ID_POPUP_ADD"
      />
    </div>
    <div>
      <PopupDetailTenant
        :idModal="constants.TENANT_CONST.ID_POPUP_DETAIL"
        :detail ="detail"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageTenant/Headers/Header.vue';
import Button from '../../components/ManageTenant/Buttons/Button.vue';
import PopupDeleteTenant from '../../components/ManageTenant/Popups/PopupDeleteTenant.vue';
import PopupAddTenant from '../../components/ManageTenant/Popups/PopupAddTenant.vue';
import PopupDetailTenant from '../../components/ManageTenant/Popups/PopupDetailTenant.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageTenant',
  components: {
    Header,
    PopupDeleteTenant,
    Button,
    PopupAddTenant,
    PopupDetailTenant,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      detail: {},
      canUpdate: false,
      search: '',
      constants,
      inputSearch: '',
      selectedListTenant: [],
      isSelectedAll: false,

    };
  },
  watch: {
    selectedListTenant: {
      handler() {
        if (this.selectedListTenant.length === this.listIdTenant.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getListTenant']),
    listTenant() {
      const items = [];
      this.getListTenant.forEach((item) => {
        items.push({
          name: item.name,
          phone: item.phone ?? item.phone2 ?? '-',
          email: item.email ?? item.email2 ?? '-',
          rep: item.rep,
          address: item.address,
          id: item.id,
        });
      });
      return items;
    },
    listIdTenant() {
      // set list id account
      const result = [];
      this.listTenant.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListTenant.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListTenant = this.listIdTenant;
      } else {
        this.selectedListTenant = [];
      }
    },
    getDetailTenant(id) {
      console.log('aaaa');
      this.selectedListTenant = [id];
      this.detail = this.getListTenant.find((item) => item.id === id);
    },
    getSingleTenantId(id) {
      this.selectedListTenant = [id];
    },
    updateSelectedListId(value) {
      this.selectedListTenant = value;
    },
    searchTenant(event) {
      event.preventDefault();
      this.$store.dispatch('getTenant', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-tenant-container {
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
