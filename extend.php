<?php

namespace Flagrow\Fonts;

use Flagrow\Fonts\Api\Controllers;
use Flagrow\Fonts\Content\FontsStylesheet;
use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use s9e\TextFormatter\Configurator;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->content(FontsStylesheet::class),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Routes('api'))
        ->get(
            '/flagrow/fonts',
            'flagrow.fonts.index',
            Controllers\ListFontController::class
        )
        ->patch(
            '/flagrow/fonts/{family}',
            'flagrow.fonts.toggle',
            Controllers\ToggleFontController::class
        ),
    (new Extend\Formatter())
        ->configure(function (Configurator $configurator) {
            $configurator->BBCodes->addFromRepository('FONT');
        }),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddForumAttributes::class);
    },
];
