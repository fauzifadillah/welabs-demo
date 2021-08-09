# fmv-highlight
> Syntax Highlight Vue Component using Highlight.js & js-beautify

### Installation
```
npm install fmv-highlight
```

### Usage
> Template

```html
<fmv-highlight :code="code" />
```

> Script

```js
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import 'fmv-highlight/dist/fmv-highlight.css'
import {FmvHighlight} from 'fmv-highlight'

export default {
  components: {
    FmvHighlight
  },
  data() {
    return {
      code: `
      // code to Syntax Highlight
      `
    }
  }
}
```
