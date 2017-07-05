<?php

namespace Flagrow\Fonts\Listeners;

use Flagrow\Fonts\Api\Controllers;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Events\Dispatcher;

class AddApiControllers
{
    /**
     * Subscribes to the Flarum api routes configuration event.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    /**
     * Registers our routes.
     *
     * @param ConfigureApiRoutes $event
     */
    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        // Browse extensions
        $event->get(
            '/flagrow/fonts',
            'flagrow.fonts.index',
            Controllers\ListFontController::class
        );

        // Toggles an extension
        $event->patch(
            '/flagrow/fonts/{family}',
            'flagrow.fonts.toggle',
            Controllers\ToggleFontController::class
        );
    }
}
