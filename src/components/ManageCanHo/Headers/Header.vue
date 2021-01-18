<template>
  <div class="header-container">
    <div class="header-container__title">{{ constants.CANHO_CONST.HEADER_MANAGE}}</div>
    <div>
      <b-button v-b-modal.modal-add-canho @click="getCommon">{{ constants.CANHO_CONST.TITLE_MANAGE }}</b-button>
    </div>
  </div>
</template>

<script>
import constants from '../../../constants/index'

export default {
  name: 'Header',
  data() {
    return {
      constants
    };
  },
  methods: {
    getCommon() {
      this.$store.dispatch('getHost', '');
      this.$store.dispatch('getBuilding', '')
    }
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  background: #28C5BD;
  opacity: 0.7;
  padding: 10px;
  &__title {
    display: flex;
    align-items: center;
    font-weight: 900;
    font-size: 18px;
    color: whitesmoke;
  }
}
</style>
