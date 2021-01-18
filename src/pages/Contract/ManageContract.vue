<template>
  <div class="manage-contract-container">
    <div class="manage-contract-container__header">
      <Header />
    </div>
    <div class="manage-contract-container__options">
      <b-form @submit="searchContract" >
        <div class="manage-contract-container__options__search-form" >
          <b-form-input class="search-form-input" placeholder="Tìm kiếm" v-model="inputSearch" ></b-form-input>
          <b-icon-search class="search-form-icon" :font-scale="1.5" @click="searchContract"></b-icon-search>
        </div>
      </b-form>
      <div class="manage-contract-container__options__button-group">
        <b-icon-trash
          class="btn-group-options"
          variant="danger"
          font-scale="2.5"
          :class="checkCanDelete ? '' : '-disable'"
          v-b-modal.modal-delete-contract
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
    <div class="manage-contract-container__table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" :checked="isSelectedAll" @click="setIsSelectedAll"/>
            </th>
            <th scope="col">Bộ hợp đồng</th>
            <th scope="col">Chủ Nhà</th>
            <th scope="col">Căn hộ</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contract, index) in listContract" :key="index">
            <td>
              <input type="checkbox" :value="contract.id" v-model="selectedListContract" />
            </td>
            <td>{{ contract.name }}</td>
            <td>{{ contract.host }}</td>
            <td>{{ contract.can_ho }}</td>
            <td>
              <div class="show-detail">
                <b-icon-pencil-square
                  variant="light"
                  @click="getSingleContract(contract.id, 'edit')"
                ></b-icon-pencil-square>
                <b-icon-trash
                  variant="light"
                  class="rounded-circle bg-danger p-2"
                  @click="getSingleContract(contract.id, 'delete')"
                ></b-icon-trash>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <PopupDeleteContract
        :titleModal="constants.CONTRACT_CONST.TITLE_POPUP_DELETE"
        :idModal="constants.CONTRACT_CONST.ID_POPUP_DELETE"
        :contentModal="constants.CONTRACT_CONST.CONTENT_POPUP_DELETE"
        :selectedListId="selectedListContract"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>

    <div>
      <PopupAddContract
        :detailContract="detailContract"
        :idModal="constants.CONTRACT_CONST.ID_POPUP_ADD"
        @updateSelectedListId="updateSelectedListId"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '../../components/ManageContract/Headers/Header.vue';
import PopupDeleteContract from '../../components/ManageContract/Popups/PopupDeleteContract.vue';
import PopupAddContract from '../../components/ManageContract/Popups/DialogCreateContract.vue';
import constants from '../../constants/index';

export default {
  name: 'ManageContract',
  components: {
    Header,
    PopupDeleteContract,
    PopupAddContract,
  },
  data() {
    return {
      styleCss: 'background: #FFFFFF;color:#333333;',
      userDetail: {},
      canUpdate: false,
      inputSearch: '',
      selectedListContract: [],
      isSelectedAll: false,
      detailContract: {},
      constants,
    };
  },
  computed: {
    ...mapGetters(['getListContract']),
    listContract() {
      const items = [];
      this.getListContract.forEach((item) => {
        items.push({
          name: item.name,
          host: item.can_ho.chu_nha.name,
          can_ho: item.can_ho.name,
          id: item.id,
        });
      });
      return items;
    },
    listIdContract() {
      // set list id account
      const result = [];
      this.listContract.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    checkCanDelete() {
      // check enable button delete
      let result;
      if (this.selectedListContract.length > 0) result = true;
      else result = false;
      return result;
    },
  },
  watch: {
    selectedListContract: {
      handler() {
        if (this.selectedListContract.length === this.listIdContract.length) {
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
        this.selectedListContract = this.listIdContract;
      } else {
        this.selectedListContract = [];
      }
    },
    getSingleContract(id, type) {
      this.selectedListContract = [id];
      const resultFindContract = this.getListContract.find((item) => item.id === id);
      if (resultFindContract) {
        this.detailContract = { ...resultFindContract };
        if (type === 'edit') {
          setTimeout(() => {
            this.$bvModal.show(constants.CONTRACT_CONST.ID_POPUP_ADD);
          }, 0);
        }
        if (type === 'delete') {
          this.$bvModal.show('modal-delete-contract');
        }
      }
    },
    searchContract(event) {
      event.preventDefault();
      this.$store.dispatch('getContract', this.inputSearch);
    },
    cancel() {
      this.$bvModal.hide('modal-detail-contract');
    },
    updateSelectedListId(value) {
      this.selectedListContract = value;
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-contract-container {
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
