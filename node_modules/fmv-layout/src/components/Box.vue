<template>
  <div
    :data-effects="boxEffects" 
    class="mdk-box">
    <div class="mdk-box__bg">
      <div 
        v-show="boxImage"
        class="mdk-box__bg-front" 
        :style="boxImage ? `background-image: url(${boxImage});` : ''" />
    </div>
    <div 
      class="mdk-box__content"
      :class="boxContentClass">
      <slot>
        <div>
          // box content
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { handler } from 'dom-factory'
import { boxComponent } from 'material-design-kit'
handler.register('mdk-box', boxComponent)

import { isArray } from '../utils/array'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    effects: {
      type: [String, Array],
      default: null
    },
    boxImage: {
      type: String,
      default: null
    },
    boxContentClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    props() {
      return ['disabled']
    },
    boxEffects() {
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
    this.$nextTick(() => handler.upgradeElement(this.$el, 'mdk-box'))
  },
  beforeDestroy() {
    if (this.$el.mdkBox) {
      this.$el.mdkBox.eventTarget.removeEventListener('scroll', () => this.onScroll())
    }

    handler.downgradeElement(this.$el, 'mdk-box')
    this.$el.removeEventListener(
      'domfactory-component-upgraded',
      this.init.bind(this)
    )
  },
  methods: {
    onScroll() {
      const state = this.$el.mdkBox.getScrollState()
      this.$emit('header-target-scroll', state)
    },
    init() {
      this.props.map(prop => {
        this.$el.mdkBox[prop] = this[prop]
        this.$watch(prop, val => (this.$el.mdkBox[prop] = val))
      })

      this.$el.mdkBox.eventTarget.addEventListener('scroll', () => this.onScroll())
      this.$nextTick(() => this.$el.mdkBox._reset())
    }
  }
}
</script>
