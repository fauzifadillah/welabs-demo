<template>
  <div
    :is="$props.tag"
    class="ps-container" 
    @mouseover.once="update" 
    @ps-scroll-y="scrollHandle" 
    @ps-scroll-x="scrollHandle" 
    @ps-scroll-up="scrollHandle" 
    @ps-scroll-down="scrollHandle" 
    @ps-scroll-left="scrollHandle" 
    @ps-scroll-right="scrollHandle" 
    @ps-y-reach-start="scrollHandle" 
    @ps-y-reach-end="scrollHandle" 
    @ps-x-reach-start="scrollHandle" 
    @ps-x-reach-end="scrollHandle">
    <slot />
  </div>
</template>

<style src="perfect-scrollbar/css/perfect-scrollbar.css" />

<style lang="scss">
.ps-container {
  position: relative;
}
</style>

<script>
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  props: {
    settings: {
      type: Object,
      default() {
        return {}
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    wheelPropagation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ps: null
    }
  },
  computed: {
    localSettings() {
      return Object.assign(
        {
          wheelPropagation: this.wheelPropagation
        },
        this.settings
      )
    }
  },
  watch: {
    $route() {
      this.update()
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    this.$nextTick(this.update)
  },
  activated() {
    this.init()
  },
  deactivated() {
    this.destroy()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    scrollHandle(evt) {
      this.$emit(evt.type, evt)
    },
    update() {
      if (this.ps) {
        this.ps.update()
        this.$emit('update')
      }
    },
    init() {
      if (!this.ps) {
        this.ps = new PerfectScrollbar(this.$el, this.localSettings)
      } else {
        this.update()
      }
    },
    destroy() {
      this.ps.destroy()
      this.ps = null
    }
  }
}
</script>
