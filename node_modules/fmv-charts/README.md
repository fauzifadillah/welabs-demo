# fmv-charts
> Charts Vue Components using Chart.js

### Installation
```
npm install fmv-charts
```

### Line Chart
> Template

```html
<fmv-line-chart
  :data="data"
  :options="options"
  prefix="$"
  suffix="k"
  class="chart" />
```

> Script

```js
import {FmvLineChart} from 'fmv-charts'

export default {
  components: {
    FmvLineChart
  },
  data() {
    return {
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Performance',
          data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40]
        }]
      }
    }
  }
}
```

### Area Chart
> Template

```html
<fmv-area-chart
  :data="data"
  :options="options"
  prefix="$"
  suffix="k"
  class="chart" />
```

> Script

```js
import {FmvAreaChart} from 'fmv-charts'

export default {
  components: {
    FmvAreaChart
  },
  data() {
    return {
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
          label: 'Performance',
          data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40]
        }]
      }
    }
  }
}
```

### Bar Chart
> Template

```html
<fmv-bar-chart
  :data="data"
  :options="options"
  prefix="$"
  suffix="k"
  class="chart" />
```

> Script

```js
import {FmvBarChart} from 'fmv-charts'

export default {
  components: {
    FmvBarChart
  },
  data() {
    return {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32],
            barThickness: 10
          }
        ]
      }
    }
  }
}
```

### Doughnut Chart
> Template

```html
<fmv-doughnut-chart
  :data="data"
  :options="options"
  suffix="%"
  class="chart" />
```

> Script

```js
import {FmvDoughnutChart} from 'fmv-charts'

export default {
  components: {
    FmvDoughnutChart
  },
  data() {
    return {
      data: {
        labels: ['Desktop', 'Tablet', 'Mobile'],
        datasets: [{
          data: [60, 25, 15],
        }]
      }
    }
  }
}
```

### Radar Chart
> Template

```html
<fmv-radar-chart
  :data="data"
  :options="options"
  suffix=" points"
  class="chart" />
```

> Script

```js
import {FmvRadarChart, settings} from 'fmv-charts'

export default {
  components: {
    FmvRadarChart
  },
  data() {
    return {
      data: {
        labels: [
          'JavaScript',
          'HTML',
          'Flinto',
          'Vue.js',
          'Sketch',
          'Priciple',
          'CSS',
          'Angular'
        ],
        datasets: [
          {
            data: [30, 35, 33, 32, 31, 30, 28, 36],
            pointHoverBorderColor: settings.colors.success[400],
            pointHoverBackgroundColor: settings.colors.white,
            borderJoinStyle: 'bevel',
            lineTension: 0.1
          }
        ]
      }
    }
  }
}
```