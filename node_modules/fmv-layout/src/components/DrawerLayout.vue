<template>
  <div
    :data-push="push"
    :data-responsive-width="responsiveWidth"
    :fullbleed="fullbleed" 
    class="mdk-drawer-layout js-mdk-drawer-layout">
    <div
      :id="contentId"
      :class="contentClass" 
      class="mdk-drawer-layout__content">
      
      <perfect-scrollbar
        v-if="hasScrollingRegion"
        style="height: 100%"
        @ps-scroll-y="$emit($event.type, $event)">
        <slot/>
      </perfect-scrollbar>

      <slot 
        v-else />

    </div>
    <!-- // END drawer-layout__content -->

    <drawer
      :id="drawerId"
      :align="drawerAlign"
      :class="drawerClasses"
      :content-class="drawerContentClass">
      <slot name="drawer">
        // drawer
      </slot>
    </drawer>
  </div>
</template>

<script>
import { handler } from 'dom-factory'
import { drawerLayoutComponent } from 'material-design-kit'
handler.register('mdk-drawer-layout', drawerLayoutComponent)

import Drawer from './Drawer.vue'
import PerfectScrollbar from './PerfectScrollbar.vue'
import { drawerProps } from './Drawer.props'
import { prefixProps } from '../utils/props'

export default {
  components: {
    Drawer,
    PerfectScrollbar
  },
  props: {
    push: {
      type: Boolean,
      default: true
    },
    fullbleed: {
      type: Boolean
    },
    hasScrollingRegion: {
      type: Boolean
    },
    responsiveWidth: {
      type: String,
      default: '992px'
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    contentId: {
      type: String,
      default: null
    },
    ...prefixProps(drawerProps, 'drawer')
  },
  mounted() {
    this.$el.addEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
    this.$nextTick(() => handler.upgradeElement(this.$el, 'mdk-drawer-layout'))
  },
  beforeDestroy() {
    this.$el.removeEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
    handler.downgradeElement(this.$el, 'mdk-drawer-layout')
  },
  methods: {
    init() {
      ;['push', 'responsiveWidth', 'fullbleed', 'hasScrollingRegion'].map(prop => {
        this.$el.mdkDrawerLayout[prop] = this[prop]
        this.$watch(prop, val => (this.$el.mdkDrawerLayout[prop] = val))
      })
    }
  }
}
</script>
