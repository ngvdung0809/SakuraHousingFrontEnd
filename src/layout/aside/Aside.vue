/* eslint-disable no-plusplus */ /* eslint-disable radix */ /* eslint-disable radix */
<template>
  <!-- begin:: Aside -->
  <div class="aside aside-left d-flex aside-fixed" id="aside" ref="aside">
    <!--begin::Primary-->
    <div class="aside-primary d-flex flex-column align-items-center flex-row-auto">
      <!--begin::Brand-->
      <Brand></Brand>
      <!--end::Brand-->
      <!--begin::Nav Wrapper-->
      <div
        class="aside-nav position-relative d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull ps"
        style="height: 528px; overflow: hidden;"
      >
        <!--begin::Nav-->
        <ul class="nav flex-column" role="tablist" v-for="(nav, index) in listNav" :key="index">
          <!--begin::Item-->
          <li
            class="nav-item mb-3"
            data-placement="right"
            data-container="body"
            data-boundary="window"
            v-b-tooltip.hover.right="nav.name"
          >
            <div
              :aria-current-value="`${index}`"
              :class="['nav-link btn btn-icon btn-clean btn-lg', getActiveTab === index && 'active']"
              data-toggle="tab"
              @click="setActiveTab(index)"
            >
              <span class="svg-icon svg-icon-xl">
                <!--begin::Svg Icon-->
                <inline-svg :src="nav.icon" />
                <!--end::Svg Icon-->
              </span>
            </div>
          </li>
        </ul>
        <div class="btn-logout" @click="logoutAction">
          <span 
            class="svg-icon-xl"
            v-b-tooltip.hover="'Đăng xuất'"
          >
            <!--begin::Svg Icon-->
            <inline-svg src="media/svg/icons/Navigation/Sign-out.svg" />
            <!--end::Svg Icon-->
          </span>
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Nav Wrapper-->
      <!--begin::Footer-->
      <div
        class="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10"
      >
        <!--begin::Aside Toggle-->
        <span
          class="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
          id="aside_toggle"
          ref="aside_toggle"
          data-placement="right"
          data-container="body"
          data-boundary="window"
          v-b-tooltip.hover.right="''"
          @click="minimizedAside"
        >
          <inline-svg
            src="media/svg/icons/Navigation/Angle-left.svg"
            :style="{ transform: asideExpand ? 'rotate(0deg)' : 'rotate(180deg)' }"
          />
        </span>
        <!--end::Aside Toggle-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Primary-->
    <!--begin::Secondary-->
    <div class="aside-secondary d-flex flex-row-fluid">
      <!--begin::Workspace-->
      <div
        class="aside-workspace scroll scroll-push my-2 ps"
        style="height: 824px; overflow: hidden;"
      >
        <!--begin::Tab Content-->
        <b-tabs class="hide-tabs">
          <!--begin::Tab Pane-->
          <b-tab>
            <!--begin::Aside Menu-->
            <div class="aside-menu-wrapper flex-column-fluid px-10 py-5" id="aside_menu_wrapper">
              <!--begin::Menu Container-->
              <div
                ref="aside_menu"
                id="aside_menu"
                class="aside-menu min-h-lg-800px"
                data-menu-vertical="1"
                data-menu-scroll="1"
              >
                <!-- example static menu here -->
                <Menu :subMenu="listNav[getActiveTab].child"></Menu>
                <!-- <MenuManage v-if="activeTab == 2"></MenuManage> -->
              </div>
              <!--end::Menu Container-->
            </div>
            <!--end::Aside Menu-->
          </b-tab>
          <!--end::Tab Pane-->
        </b-tabs>
        <!--end::Tab Content-->
        <!--end::Workspace-->
      </div>
      <!--end::Secondary-->
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import { mapGetters } from 'vuex';
import Brand from '@/layout/brand/Brand.vue';
import Menu from '@/layout/aside/Menu.vue';
// import MenuManage from '@/components/Manage/MenuManage.vue';

export default {
  name: 'Aside',
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
      tabIndex: 0,
      asideExpand: true,
      listNav: [
        {
          name: 'Dashboard',
          icon: 'media/svg/icons/Layout/Layout-4-blocks.svg',
          child: [
            {
              nameSubNav: 'Tổng quát',
              router: '/summary',
              icon: 'media/svg/icons/Design/Select.svg',
            },
          ],
        },
        {
          name: 'Admin',
          icon: 'media/svg/icons/Communication/Group.svg',
          child: [
            {
              nameSubNav: 'Tài khoản',
              router: '/manage-account',
              icon: 'media/svg/icons/Communication/Address-card.svg',
            },
          ],
        },
        {
          name: 'Các bên liên quan',
          icon: 'media/svg/icons/Home/Home.svg',
          child: [
            {
              nameSubNav: 'Tòa nhà',
              router: '/manage-building',
              icon: 'media/svg/icons/Map/Marker1.svg',
            },
            {
              nameSubNav: 'Căn hộ',
              router: '/manage-appartment',
              icon: 'media/svg/icons/Map/Marker1.svg',
            },
            {
              nameSubNav: 'Dịch vụ',
              router: '/manage-service',
              icon: 'media/svg/icons/Map/Marker1.svg',
            },
          ],
        },
        {
          name: 'Hợp đồng',
          icon: 'media/svg/icons/Home/Commode1.svg',
          child: [
            {
              nameSubNav: 'Quản lý bộ hợp đồng',
              router: '/manage-contract',
              icon: 'media/svg/icons/Communication/Clipboard-list.svg',
            },
            {
              nameSubNav: 'Chủ nhà',
              router: '/manage-host',
              icon: 'media/svg/icons/General/User.svg',
            },
            {
              nameSubNav: 'Khách thuê',
              router: '/manage-guest',
              icon: 'media/svg/icons/General/User.svg',
            },
            {
              nameSubNav: 'Công ty môi giới',
              router: '/manage-company',
              icon: 'media/svg/icons/Home/Building.svg',
            },
          ],
        },
        {
          name: 'Thanh toán',
          icon: 'media/svg/icons/Design/PenAndRuller.svg',
          child: [
            {
              nameSubNav: 'Danh sách kỳ TT hợp đồng',
              router: '/period-payment-contract',
              icon: 'media/svg/icons/Code/Compiling.svg',
            },
            {
              nameSubNav: 'Danh sách kỳ TT dịch vụ',
              router: '/period-payment-service',
              icon: 'media/svg/icons/Code/Compiling.svg',
            },
          ],
        },
        {
          name: 'Báo cáo chung',
          icon: 'media/svg/icons/Files/Selected-file.svg',
          child: [
            {
              nameSubNav: 'Nợ xấu kỳ TT hợp đồng',
              router: '/bad-debt-contract',
              icon: 'media/svg/icons/Code/Compiling.svg',
            },
            {
              nameSubNav: 'Nợ xấu kỳ TT dịch vụ',
              router: '/bad-debt-service',
              icon: 'media/svg/icons/Code/Compiling.svg',
            },
          ],
        },
        {
          name: 'Cài đặt',
          icon: 'media/svg/icons/Navigation/Exchange.svg',
          child: [
            {
              nameSubNav: 'Thay đổi mật khẩu',
              router: '/change-password',
              icon: 'media/svg/icons/General/Settings-2.svg',
            },
          ],
        },
      ],
    };
  },
  components: {
    Brand,
    Menu,
    // MenuManage,
  },
  computed: {
    ...mapGetters(['layoutConfig', 'getClasses', 'getActiveTab']),

    /**
     * Get extra classes for menu based on the options
     */
    asideMenuClass() {
      const classes = this.getClasses('aside_menu');
      if (typeof classes !== 'undefined') {
        return classes.join(' ');
      }
      return null;
    },
  },
  methods: {
    setActiveTab(index) {
      // set active menu
      // this.getActiveTab = index;
      this.$store.commit('SET_ACTIVE_TAB', index);
      document.body.classList.remove('aside-minimize');
      this.asideExpand = true;
    },
    minimizedAside() {
      if (this.asideExpand) {
        document.body.classList.add('aside-minimize');
        this.asideExpand = false;
      } else {
        document.body.classList.remove('aside-minimize');
        this.asideExpand = true;
      }
    },
    logoutAction() {
      sessionStorage.removeItem('jwtToken');
      this.$router.push('/login');
    },
  },
};
</script>
