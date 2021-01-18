<template>
  <div class="manage-canho-container">
    <div class="manage-canho-container__header">
      <Header />
    </div>
    <div class="manage-canho-container__options">
      <b-form @submit="searchCanHo" >
        <div class="manage-canho-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchCanHo"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-canho-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-canho
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
    <div class="manage-canho-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll"/>
            </th>
            <th scope="col">Căn Hộ</th>
            <th scope="col">Chủ Nhà</th>
            <th scope="col">Tòa Nhà</th>
            <th scope="col">Địa Chỉ</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(can_ho, index) in listCanHo" :key="index">
            <td>
              <input type="checkbox" :value="can_ho.id" v-model="selectedListCanHo" />
            </td>
            <td>{{ can_ho.name }}</td>
            <td>{{ can_ho.host }}</td>
            <td>{{ can_ho.building }}</td>
            <td>{{ can_ho.address }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetaiCanHo(can_ho.id)"
                  v-b-modal.modal-detail-canho
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-canho
                  @click="getSingleCanHoId(can_ho.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <PopupDeleteCanHo
        :titleModal="constants.CANHO_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.CANHO_CONST.ID_POPUP_DELETE"
        :contentModal="constants.CANHO_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListCanHo"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
    <div>
      <PopupAddCanHo
        :titleModal="constants.CANHO_CONST.TITLE_MANAGE"
        :idModal="constants.CANHO_CONST.ID_POPUP_ADD"
      />
    </div>
    <div>
      <PopupDetailCanHo
        :idModal="constants.CANHO_CONST.ID_POPUP_DETAIL"
        :detail ="detail"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageCanHo/Headers/Header.vue';
import PopupDeleteCanHo from '../../components/ManageCanHo/Popups/PopupDeleteCanHo.vue';
import PopupAddCanHo from '../../components/ManageCanHo/Popups/PopupAddCanHo.vue';
import PopupDetailCanHo from '../../components/ManageCanHo/Popups/PopupDetailCanHo.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageCanHo',
  components: {
    Header,
    PopupDeleteCanHo,
    PopupAddCanHo,
    PopupDetailCanHo,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      canUpdate: false,
      inputSearch: '',
      selectedListCanHo: [],
      isSelectedAll: false,
      constants,
      detail: {},
    };
  },
  computed: {
    ...mapGetters(['getlistCanHo']),
    listCanHo() {
      const items = [];
      this.getlistCanHo.forEach((item) => {
        items.push({
          name: item.name,
          host: item.chu_nha.name,
          building: item.toa_nha?.name,
          address: item.address,
          id: item.id,
        });
      });
      return items;
    },
    listIdCanHo() {
      // set list id account
      const result = [];
      this.listCanHo.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListCanHo.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  watch: {
    selectedListCanHo: {
      handler() {
        if (this.selectedListCanHo.length === this.listIdCanHo.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  methods: {
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListCanHo = this.listIdCanHo;
      } else {
        this.selectedListCanHo = [];
      }
    },
    getDetaiCanHo(id) {
      this.selectedListCanHo = [id];
      this.detail = this.getlistCanHo.find((item) => item.id === id);
      this.$store.dispatch('getHost', '');
      this.$store.dispatch('getBuilding', '')
    },
    getSingleCanHoId(id) {
      this.selectedListCanHo = [id];
    },
    searchCanHo(event) {
      event.preventDefault();
      this.$store.dispatch('getAppartment', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
    updateSelectedListId(value) {
      this.selectedListCanHo = value;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-canho-container {
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
