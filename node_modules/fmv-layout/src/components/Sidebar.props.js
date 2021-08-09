export default {
  props: {
    type: {
      type: String,
      default: 'light'
    },
    variant: {
      type: String,
      default: null
    },
    align: {
      type: String,
      default: 'start',
      validator: val => ['start', 'end', 'left', 'right'].includes(val)
    }
  }
}