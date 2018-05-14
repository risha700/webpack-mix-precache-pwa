let mix = require('laravel-mix');


class serviceWorkerExt {

    dependencies() {

        this.requiresReload = true;
        return ['sw-precache-webpack-plugin'];
    }

    boot() {
        let SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
        mix.webpackConfig({
            plugins: [
                new SWPrecacheWebpackPlugin({
                    cacheId: 'webpack-pwa-example',
                    filename: 'service-worker.js',
                    staticFileGlobs: ['public/**/*.{css,eot,svg,ttf,woff,woff2,js,html}'],
                    minify: false,
                    stripPrefix: 'public/',
                    handleFetch: true,
                    dynamicUrlToDependencies: {
                        //example to process cache
                        '/': ['resources/views/layouts/app.blade.php']
                        // '/articles': ['resources/views/articles.blade.php']
                    },
                    staticFileGlobsIgnorePatterns: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],
                    runtimeCaching: [
                        {
                            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                            handler: 'cacheFirst'
                        },
                        {
                            urlPattern: /^https:\/\/www\.webpack-pwa\.test\/images\/media\/drink\/(\w+)\.jpg/,
                            handler: 'cacheFirst'
                        }
                    ],
                    importScripts: ['./js/push_message.js']
                })
            ]
        });
    }
}








mix.extend('sw', new serviceWorkerExt());



