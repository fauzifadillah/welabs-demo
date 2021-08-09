<template>
  <div
    :data-effects="headerEffects" 
    class="mdk-header js-mdk-header">
    <div class="mdk-header__bg">
      <div 
        v-show="headerImage"
        class="mdk-header__bg-front" :style="headerImage ? `background-image: url(${headerImage});` : ''" />
    </div>
    <div 
      class="mdk-header__content"
      :class="headerContentClass">
      <slot>
        <div data-primary>
          // header
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { handler } from 'dom-factory'
import { headerComponent } from 'material-design-kit'
handler.register('mdk-header', headerComponent)

import { isArray } from '../utils/array'

export default {
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    reveals: {
      type: Boolean,
      default: false
    },
    condenses: {
      type: Boolean,
      default: false
    },
    effects: {
      type: [String, Array],
      default: null
    },
    headerImage: {
      type: String,
      default: null
    },
    headerContentClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    props() {
      return ['fixed', 'disabled', 'reveals', 'condenses']
    },
    headerEffects() {
      if (this.effects) {
        let effects = isArray(this.effects) ? this.effects : [this.effects]
        return effects.join(' ')
      }
    }
  },
  mounted() {
    this.$el.addEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
    this.$nextTick(() => handler.upgradeElement(this.$el, 'mdk-header'))
  },
  beforeDestroy() {
    if (this.$el.mdkHeader) {
      this.$el.mdkHeader.eventTarget.removeEventListener('scroll', () => this.onScroll())
    }

    handler.downgradeElement(this.$el, 'mdk-header')
    this.$el.removeEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
  },
  methods: {
    onScroll() {
      const state = this.$el.mdkHeader.getScrollState()
      this.$emit('header-target-scroll', state)
    },
    init() {
      this.props.map(prop => {
        this.$el.mdkHeader[prop] = this[prop]
        this.$watch(prop, val => (this.$el.mdkHeader[prop] = val))
      })

      this.$el.mdkHeader.eventTarget.addEventListener('scroll', () => this.onScroll())
      this.$nextTick(() => this.$el.mdkHeader._reset())
    }
  }
}
</script>
