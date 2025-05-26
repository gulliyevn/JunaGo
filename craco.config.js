const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Добавляем поддержку CSS модулей для TypeScript
      const cssRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf && Array.isArray(rule.oneOf)
      );

      if (cssRule && cssRule.oneOf) {
        // Находим правило для css файлов
        const cssModuleRule = cssRule.oneOf.find(
          (rule) => 
            rule.test && 
            rule.test.toString().includes('module\\.css')
        );

        if (cssModuleRule) {
          // Обновляем опции для CSS модулей
          cssModuleRule.use.forEach((loader) => {
            if (loader.options && loader.options.modules) {
              loader.options.modules = {
                ...loader.options.modules,
                exportLocalsConvention: 'camelCaseOnly',
              };
            }
          });
        }
      }

      // Production оптимизации
      if (env === 'production') {
        // Оптимизация chunks
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              // Vendor chunks для библиотек
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: 10,
                reuseExistingChunk: true,
              },
              // Monaco Editor в отдельный chunk
              monaco: {
                test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
                name: 'monaco',
                priority: 20,
                reuseExistingChunk: true,
              },
              // React в отдельный chunk
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react',
                priority: 20,
                reuseExistingChunk: true,
              },
              // UI библиотеки
              ui: {
                test: /[\\/]node_modules[\\/](react-icons|keen-slider)[\\/]/,
                name: 'ui-libs',
                priority: 15,
                reuseExistingChunk: true,
              },
              // Общие компоненты
              common: {
                name: 'common',
                minChunks: 2,
                priority: 5,
                reuseExistingChunk: true,
              },
            },
          },
          // Минимизация
          minimize: true,
          // Runtime chunk
          runtimeChunk: {
            name: 'runtime',
          },
        };

        // Убираем source maps в production для безопасности
        webpackConfig.devtool = false;

        // Bundle analyzer только при необходимости
        if (process.env.ANALYZE) {
          webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false,
              reportFilename: 'bundle-report.html'
            })
          );
        }
      }

      // Игнорировать предупреждения о source maps для Monaco Editor
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        (warning) => warning.message.includes('source-map-loader')
      ];

      // Performance бюджеты
      webpackConfig.performance = {
        maxAssetSize: 512 * 1024, // 512KB
        maxEntrypointSize: 1024 * 1024, // 1MB
        hints: env === 'production' ? 'warning' : false,
      };

      return webpackConfig;
    },
    plugins: {
      add: [
        new MonacoWebpackPlugin({
          languages: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown'],
          filename: 'static/js/[name].worker.js',
          publicPath: '/',
          // Оптимизируем для production
          features: [
            '!accessibilityHelp',
            '!anchorSelect',
            '!bracketMatching',
            '!caretOperations',
            '!clipboard',
            '!codeAction',
            '!codelens',
            '!colorPicker',
            '!comment',
            '!contextmenu',
            '!coreCommands',
            '!cursorUndo',
            '!dnd',
            '!documentSymbols',
            '!find',
            '!folding',
            '!fontZoom',
            '!format',
            '!gotoError',
            '!gotoLine',
            '!gotoSymbol',
            '!hover',
            '!iPadShowKeyboard',
            '!inPlaceReplace',
            '!indentation',
            '!inlayHints',
            '!inspectTokens',
            '!linesOperations',
            '!linkedEditing',
            '!links',
            '!multicursor',
            '!parameterHints',
            '!quickCommand',
            '!quickHelp',
            '!quickOutline',
            '!referenceSearch',
            '!rename',
            '!smartSelect',
            '!snippet',
            '!suggest',
            '!toggleHighContrast',
            '!toggleTabFocusMode',
            '!transpose',
            '!unusualLineTerminators',
            '!viewportSemanticTokens',
            '!wordHighlighter',
            '!wordOperations',
            '!wordPartOperations'
          ]
        })
      ]
    }
  },
  typescript: {
    enableTypeChecking: true,
  },
  // Babel оптимизации
  babel: {
    plugins: [
      // Удаляем console.log в production
      process.env.NODE_ENV === 'production' && [
        'transform-remove-console',
        { exclude: ['error', 'warn'] }
      ]
    ].filter(Boolean),
  },
}; 