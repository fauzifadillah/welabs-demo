<script>
import chartMixin from './chart'
import { settings } from './settings'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [chartMixin],
  computed: {
    localOptions() {
      return {
        elements: {
          line: {
            fill: 'start',
            backgroundColor: settings.charts.colors.area
          }
        }
      }
    }
  }
}
</script>
