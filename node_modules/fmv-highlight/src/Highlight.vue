<template>
  <div
    v-highlightjs="beautify(code)">
    <code
      :class="hlClass" 
      class="highlight" />
  </div>
</template>

<style src="highlight.js/styles/vs2015.css" />

<style>
  .highlight {
    white-space: pre-wrap !important;
  }
  .hljs {
    padding: 0;
  }
</style>

<script>
  const beautify = require('js-beautify')

  export default {
    props: {
      code: {
        type: String,
        default: ''
      },
      lang: {
        type: String,
        default() {
          return 'html'
        }
      },
      codeClass: {
        type: [String, Array, Object],
        default: () => 'bg-dark'
      }
    },
    computed: {
      hlClass() {
        return [this.lang, this.codeClass]
      }
    },
    methods: {
      beautify(str) {
        const opt = {
          indent_size: 2,
          wrap_attributes: 'force'
        }
        return this.lang === 'js' ? beautify(str, opt) : beautify.html(str, opt)
      }
    }
  }
</script>
