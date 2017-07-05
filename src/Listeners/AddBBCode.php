<?php

namespace Flagrow\Fonts\Listeners;

use Flarum\Event\ConfigureFormatter;
use Illuminate\Contracts\Events\Dispatcher;

class AddBBCode
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureFormatter::class, [$this, 'addBBCode']);
    }

    public function addBBCode(ConfigureFormatter $event)
    {
        $event->configurator->BBCodes->addFromRepository('FONT');
    }
}
