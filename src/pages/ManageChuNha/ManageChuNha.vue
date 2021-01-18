<template>
  <div class="manage-chunha-container">
    <div class="manage-chunha-container__header">
      <Header />
    </div>
    <div class="manage-chunha-container__options">
      <b-form @submit="searchChuNha" >
        <div class="manage-chunha-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchChuNha"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-chunha-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-chunha
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
    <div class="manage-chunha-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll"/>
            </th>
            <th scope="col">Tên chủ nhà</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Email</th>
            <th scope="col">Giấy tờ tùy thân</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(chu_nha, index) in listChuNha" :key="index">
            <td>
              <input type="checkbox" :value="chu_nha.id" v-model="selectedListChuNha" />
            </td>
            <td>{{ chu_nha.name }}</td>
            <td>{{ chu_nha.phone }}</td>
            <td>{{ chu_nha.email }}</td>
            <td>{{ chu_nha.identity }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getDetailChuNha(chu_nha.id)"
                  v-b-modal.modal-detail-chunha
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  v-b-modal.modal-delete-chunha
                  @click="getSingleChuNhaId(chu_nha.id)"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <PopupDeleteChuNha
        :titleModal="constants.CHUNHA_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.CHUNHA_CONST.ID_POPUP_DELETE"
        :contentModal="constants.CHUNHA_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListChuNha"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
    <div>
      <PopupAddChuNha
        :titleModal="constants.CHUNHA_CONST.TITLE_POPUP_ADD"
        :idModal="constants.CHUNHA_CONST.ID_POPUP_ADD"
      />
    </div>

    <div>
      <PopupDetailChuNha
        :idModal="constants.CHUNHA_CONST.ID_POPUP_DETAIL"
        :detail ="detail"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageChuNha/Headers/Header.vue';
import PopupDeleteChuNha from '../../components/ManageChuNha/Popups/PopupDeleteChuNha.vue';
import PopupAddChuNha from '../../components/ManageChuNha/Popups/PopupAddChuNha.vue';
import PopupDetailChuNha from '../../components/ManageChuNha/Popups/PopupDetailChuNha.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageChuNha',
  components: {
    Header,
    PopupDeleteChuNha,
    PopupAddChuNha,
    PopupDetailChuNha
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      canUpdate: false,
      inputSearch: '',
      selectedListChuNha: [],
      isSelectedAll: false,
      detail: {},
      constants,
    };
  },
  watch: {
    selectedListChuNha: {
      handler() {
        if (this.selectedListChuNha.length === this.listChuNha.length) {
          this.isSelectedAll = true;
        } else {
          this.isSelectedAll = false;
        }
      },
    },
  },
  computed: {
    ...mapGetters(['getlistChuNha']),
    listChuNha() {
      const items = [];
      this.getlistChuNha.forEach((item) => {
        items.push({
          name: item.name,
          phone: item.phone,
          email: item.email,
          identity: item.cmt ?? item.cccd ?? item.passport_no ?? '-',
          id: item.id,
        });
      });
      return items;
    },
    listIDChuNha() {
      const result = [];
      this.listChuNha.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListChuNha.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  methods: {
    searchChuNha(event) {
      event.preventDefault();
      this.$store.dispatch('getHost', this.inputSearch);
    },
    getDetailChuNha(id) {
      this.selectedListChuNha = [id];
      this.detail = this.getlistChuNha.find((item) => item.id === id);
    },
    setIsSelectedAll() {
      this.isSelectedAll = !this.isSelectedAll;
      if (this.isSelectedAll) {
        this.selectedListChuNha = this.listIDChuNha;
      } else {
        this.selectedListChuNha = [];
      }
    },
    updateSelectedListId(value) {
      this.selectedListChuNha = value;
    },
    submit() {
      // console.log('ok');
    },
    getSingleChuNhaId(id) {
      this.selectedListChuNha = [id];
    },
    cancel() {
      this.$bvModal.hide('modal-detail-account');
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-chunha-container {
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
