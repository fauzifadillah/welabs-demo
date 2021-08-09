import FmvDrawer from './components/Drawer.vue'
import FmvDrawerLayout from './components/DrawerLayout.vue'
import FmvHeader from './components/Header.vue'
import FmvBox from './components/Box.vue'
import FmvHeaderLayout from './components/HeaderLayout.vue'
import FmvPerfectScrollbar from './components/PerfectScrollbar.vue'
import FmvSidebar from './components/Sidebar.vue'
import FmvSidebarMenu from './components/SidebarMenu.vue'

import listenOnRootMixin from './mixins/listen-on-root'

import { isArray } from './utils/array'
import { prefixProps } from './utils/props'
import { drawerProps } from './components/Drawer.props'
import sidebarProps from './components/Sidebar.props'

import FmvToggle from './directives/toggle'

const utils = {
  isArray,
  prefixProps,
  drawerProps,
  sidebarProps: sidebarProps.props
}

const mixins = {
  listenOnRootMixin
}

export {
  FmvDrawer,
  FmvDrawerLayout,
  FmvHeader,
  FmvBox,
  FmvHeaderLayout,
  FmvPerfectScrollbar,
  FmvSidebar,
  FmvSidebarMenu,
  FmvToggle,
  mixins,
  utils,
}
