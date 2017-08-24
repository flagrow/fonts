<?php

namespace Flagrow\Fonts;

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddApiControllers::class);
    $events->subscribe(Listeners\AddBBCode::class);
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddForumAttributes::class);
};
