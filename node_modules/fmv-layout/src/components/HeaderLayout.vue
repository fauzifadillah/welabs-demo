<template>
  <div 
    class="mdk-header-layout js-mdk-header-layout">

    <!-- Header -->
    <app-header
      :fixed="headerFixed"
      :reveals="headerReveals"
      :condenses="headerCondenses"
      :disabled="headerDisabled"
      :effects="headerEffects"
      :header-image="headerImage"
      :header-content-class="headerContentClass"
      :class="headerClass"
      @header-target-scroll="handleEmit('header-target-scroll', $event)">
      <slot name="header">
        // header
      </slot>
    </app-header>
    <!-- // END Header -->

    <!-- Header Layout Content -->
    <div
      :class="contentClass"
      :id="contentId"
      class="mdk-header-layout__content"
      :style="{ height: fullbleed ? '100%' : '' }">
      <slot/>
    </div>
    <!-- // END header-layout__content -->

  </div>
</template>

<script>
import { handler } from 'dom-factory'
import { headerLayoutComponent } from 'material-design-kit'
handler.register('mdk-header-layout', headerLayoutComponent)

import AppHeader from './Header.vue'

export default {
  components: {
    AppHeader
  },
  props: {
    fullbleed: {
      type: Boolean
    },
    headerFixed: {
      type: Boolean,
      default: true
    },
    headerDisabled: {
      type: Boolean,
      default: false
    },
    headerReveals: {
      type: Boolean,
      default: false
    },
    headerCondenses: {
      type: Boolean,
      default: false
    },
    headerEffects: {
      type: [String, Array],
      default: null
    },
    headerClass: {
      type: [String, Array, Object],
      default: null
    },
    headerContentClass: {
      type: [String, Array, Object],
      default: null
    },
    contentClass: {
      type: [String, Array, Object],
      default: null
    },
    contentId: {
      type: String,
      default: null
    },
    headerImage: {
      type: String,
      default: null
    }
  },
  watch: {
    headerClass: 'reset'
  },
  mounted() {
    this.$el.addEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
    this.$nextTick(() => handler.upgradeElement(this.$el, 'mdk-header-layout'))
  },
  beforeDestroy() {
    this.$el.removeEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
    handler.downgradeElement(this.$el, 'mdk-header-layout')
  },
  methods: {
    init() {
      this.$nextTick(this.reset)
      setTimeout(this.reset.bind(this), 200)
      setTimeout(this.reset.bind(this), 1000)
      this.$el.mdkHeaderLayout.fullbleed = this.fullbleed
      this.$root.$on('reset::header-layout', this.reset)

      this.$watch('$route', this.reset)

      ;['fullbleed'].map(prop => {
        this.$el.mdkHeaderLayout[prop] = this[prop]
        this.$watch(prop, val => (this.$el.mdkHeaderLayout[prop] = val))
      })
    },
    reset() {
      this.$nextTick(() => this.$el.mdkHeaderLayout._reset())
    },
    handleEmit(type, e) {
      this.$emit(type, e)
    }
  }
}
</script>
