<template>
  <b-input-group class="input-group-merge">
    <b-form-input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :name="name"
      :value="value"
      :readonly="readonly"
      :plaintext="plaintext"
      :autocomplete="autocomplete"
      :formatter="formatter"
      :lazy-formatter="lazyFormatter"
      :aria-invalid="ariaInvalid"
      :class="inputClass"
      :state="state"
      v-model="localValue" />
    <b-input-group-prepend v-if="prepend">
      <b-input-group-text>
        <slot />
      </b-input-group-text>
    </b-input-group-prepend>
    <b-input-group-append v-if="append">
      <b-input-group-text>
        <slot />
      </b-input-group-text>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import {BFormInput} from 'bootstrap-vue/esm/components/form-input/form-input'

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    prepend: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    state: {
      type: [Boolean, String],
      default: null
    },
    ...BFormInput.options.props,
    formatter: {
      type: Function,
      default: val => val
    }
  },
  data() {
    return {
      localValue: this.value
    }
  },
  computed: {
    inputClass() {
      return [
        this.prepend ? 'form-control-prepended' : null,
        this.append ? 'form-control-appended' : null
      ]
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.localValue = this.value
    },
    localValue(newVal, oldVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style lang="scss">
@import 'fm-input-group-merge/src/fm-input-group-merge.scss';
</style>
