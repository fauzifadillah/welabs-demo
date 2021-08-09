<script>
import chartMixin from './chart'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [chartMixin]
}
</script>
