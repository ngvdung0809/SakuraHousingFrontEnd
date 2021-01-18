<template>
  <b-modal :id="idModal" no-close-on-backdrop size="sm" :title="titleModal">
    <div>{{ contentModal }}</div>
    <template #modal-footer="">
      <b-button size="sm" variant="danger" @click="cancel">
        Không
      </b-button>
      <b-button size="sm" variant="success" @click="submit">
        Có
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '../../../constants/index';
import utils from '../../../utils/index';

export default {
  props: {
    idModal: {
      type: String,
    },
    titleModal: {
      type: String,
    },
    contentModal: {
      type: String,
    },
    selectedListId: {
      type: Array,
    },
  },
  data() {
    return {
      constants,
    };
  },
  computed: {
    ...mapGetters(['getErrorCodeContract']),
  },
  methods: {
    makeToastMessage(message, status) {
      this.$bvToast.toast(message, {
        title: 'Thông báo',
        variant: status,
        autoHideDelay: 2000,
        solid: true,
      });
    },
    async submit() {
      const payload = {
        list_id: this.selectedListId,
      };
      await this.$store.dispatch('deleteContract', payload);
      if (this.getErrorCodeContract === 0) {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_DELETE_SUCCEED, 'success');
      } else {
        this.makeToastMessage(constants.COMMON_CONST.MESSAGE_DELETE_FAILED, 'danger');
      }
      this.$bvModal.hide(this.idModal);
      this.$emit('updateSelectedListId', []);
      await this.$store.dispatch('getContract', '');
    },
    cancel() {
      this.$bvModal.hide(this.idModal);
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
