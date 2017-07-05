var gulp = require('flarum-gulp');

gulp({
    files: [
        'node_modules/webfontloader/webfontloader.js'
    ],
    modules: {
        'flagrow/fonts': 'src/**/*.js'
    }
});
