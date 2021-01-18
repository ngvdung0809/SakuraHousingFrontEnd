<template>
  <div class="manage-khachthue-container">
    <div class="manage-khachthue-container__header">
      <Header />
    </div>
    <div class="manage-khachthue-container__options">
      <b-form @submit="searchGuest" >
        <div class="manage-khachthue-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchGuest"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-khachthue-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-guest
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
    <div class="manage-khachthue-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll"/>
            </th>
            <th scope="col">Tên khách thuê</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Email</th>
            <th scope="col">Giấy tờ tùy thân</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(guest, index) in listGuest" :key="index">
            <td>
              <input type="checkbox" :value="guest.id" v-model="selectedListGuest" />
            </td>
            <td>{{ guest.name }}</td>
            <td>{{ guest.phone }}</td>
            <td>{{ guest.email }}</td>
            <td>{{ guest.identity }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailGuest(guest.id)"
                  v-b-modal.modal-detail-guest
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-guest
                  @click="getSingleGuestId(guest.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <PopupDeleteGuest
        :titleModal="constants.GUEST_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.GUEST_CONST.ID_POPUP_DELETE"
        :contentModal="constants.GUEST_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListGuest"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
    <div>
      <PopupAddGuest
        :titleModal="constants.GUEST_CONST.TITLE_POPUP_ADD"
        :idModal="constants.GUEST_CONST.ID_POPUP_ADD"
      />
    </div>
    <div>
      <PopupDetailGuest
        :idModal="constants.GUEST_CONST.ID_POPUP_DETAIL"
        :detail ="detail"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageKhachThue/Headers/Header.vue';
import PopupDeleteGuest from '../../components/ManageKhachThue/Popups/PopupDeleteGuest.vue';
import PopupAddGuest from '../../components/ManageKhachThue/Popups/PopupAddKhachThue.vue';
import PopupDetailGuest from '../../components/ManageKhachThue/Popups/PopupDetailKhachThue.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageKhachThue',
  components: {
    Header,
    PopupDeleteGuest,
    PopupAddGuest,
    PopupDetailGuest,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      canUpdate: false,
      inputSearch: '',
      selectedListGuest: [],
      isSelectedAll: false,
      detail: {},
      constants,
    };
  },
  watch: {
    selectedListGuest: {
      handler() {
        if (this.selectedListGuest.length === this.listIdGuest.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistKhachThue']),
    listGuest() {
      const items = [];
      this.getlistKhachThue.forEach((item) => {
        items.push({
          name: item.name,
          phone: item.phone,
          email: item.email,
          identity: item.cmt ?? item.cccd ?? item.passport_no ?? '-',
          id: item.id
        });
      });
      return items;
    },
    listIdGuest() {
      // set list id account
      const result = [];
      this.listGuest.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListGuest.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListGuest = this.listIdGuest;
      } else {
        this.selectedListGuest = [];
      }
    },
    getDetailGuest(id) {
      this.selectedListGuest = [id];
      this.detail = this.getlistKhachThue.find((item) => item.id === id);
    },
    getSingleGuestId(id) {
      this.selectedListGuest = [id];
    },
    updateSelectedListId(value) {
      this.selectedListGuest = value;
    },
    searchGuest(event) {
      event.preventDefault();
      this.$store.dispatch('getGuest', this.search);
    },
    submit() {
      // console.log('ok');
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-khachthue-container {
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
