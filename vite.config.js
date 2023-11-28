import {minify} from 'html-minifier'
import {join, resolve} from 'path'
import {defineConfig} from 'vite'
import fs from 'fs'

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...(function (PAGE_PATH) {
          return fs.readdirSync(PAGE_PATH).map(x => join(PAGE_PATH, x, 'index.html'))
        })(resolve(__dirname, './src/articles'))
      },
      output: {
        entryFileNames: '[name].mjs'
      }
    },
    modulePreload: {
      polyfill: false
    }
  },
  resolve: {
    alias: {
      '@constant': 'src/constant.ts',
      '@util': 'src/util.ts',
    }
  },
  plugins: [
    {
      name: 'vite-html-minify',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html) {
        return minify(html, {
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          decodeEntities: true,
          includeAutoGeneratedTags: false,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          preventAttributesEscaping: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeEmptyElements: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: true,
          sortAttributes: true,
          sortClassName: true,
          trimCustomFragments: true,
          useShortDoctype: true
        })
      }
    }
  ]
})
