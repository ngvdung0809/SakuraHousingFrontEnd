<template>
  <div class="overview-container">
    <h1 class="text-center">TỔNG QUAN</h1>
    <div class="row sparkboxes mt-15">
      <div class="col-md-3">
        <div class="box box1">
          <div class="details">
            <h3 class="text-color">{{ responseData.chu_nha }}</h3>
            <h4 class="text-color">CHỦ NHÀ</h4>
          </div>
          <div id="spark1"></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="box box2">
          <div class="details">
            <h3 class="text-color">{{ responseData.khach_thue }}</h3>
            <h4 class="text-color">KHÁCH THUÊ</h4>
          </div>
          <div id="spark2"></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="box box3">
          <div class="details">
            <h3 class="text-color">{{ responseData.toa_nha }}</h3>
            <h4 class="text-color">TÒA NHÀ</h4>
          </div>
          <div id="spark3"></div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="box box4">
          <div class="details">
            <h3 class="text-color">{{ responseData.can_ho }}</h3>
            <h4 class="text-color">CĂN HỘ</h4>
          </div>
          <div id="spark4"></div>
        </div>
      </div>
    </div>
    <div class="row mt-25">
      <div class="col-md-7">
        <label class="sub-text">Thông tin cơ bản:</label>
        <div class="box shadow mt-4">
          <div id="chart">
            <apexchart height=345 :options="barChartOption" :series="seriesBarChart" v-if="flag"></apexchart>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <label class="sub-text">Số hợp đồng:</label>
        <div class="box shadow mt-4">
          <div id="chart">
            <apexchart :options="chartOptionsPie" :series="seriesPieChart" v-if="flag"></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../core/services/api/api';
import constants from '../../constants/index';

export default {
  name: 'Summary',
  data() {
    return {
      responseData: [],
      seriesPieChart: [0, 0, 0],
      chartOptionsPie: constants.COMMON_CONST.PIE_CHART_OPTIONS,
      seriesBarChart: [],
      barChartOption: constants.COMMON_CONST.BAR_CHART_OPTION,
      constants,
      flag: false,
    };
  },
  async created() {
    await this.overview();
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
    async overview() {
      this.$store.commit('SET_IS_LOADING', true);
      const response = await api('overview');
      this.$store.commit('SET_IS_LOADING', false);
      if (response.data.error_code === 0) {
        this.responseData = response.data.data;
        this.seriesPieChart = this.responseData.chart_series2;
        const series = {
          name: '',
          data: this.responseData.chart_series1,
        };
        this.seriesBarChart.push(series);
        this.flag = true;
      } else {
        this.makeToastMessage(response.data.message, 'danger');
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.overview-container {
  .text-center {
    color: burlywood;
    font-weight: 600;
  }
  .sparkboxes .box {
    padding-top: 10px;
    padding-bottom: 10px;
    text-shadow: 0 1px 1px 1px #666;
    box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
    position: relative;
    border-radius: 5px;
  }

  .sparkboxes strong {
    position: relative;
    z-index: 3;
    top: -8px;
    color: #fff;
  }

  .sparkboxes .box1 {
    background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
  }

  .sparkboxes .box2 {
    background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
  }

  .sparkboxes .box3 {
    background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);
  }

  .sparkboxes .box4 {
    background-image: linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%);
  }
}
</style>

<style lang='scss' scoped>
  .details {
    margin-left: 15px;
  }
  .sub-text {
    font-weight: 600;
    font-size: 15px;
  }
  .text-color {
    color: #fff;
  }
</style>
