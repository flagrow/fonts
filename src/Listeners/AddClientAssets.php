<?php

namespace Flagrow\Fonts\Listeners;

use DirectoryIterator;
use Flagrow\Fonts\Managers\FontManager;
use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\ConfigureLocales;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }

    public function addAssets(ConfigureWebApp $event)
    {
        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__.'/../../js/admin/dist/extension.js',
                __DIR__.'/../../less/extension.less',
            ]);
            $event->addBootstrapper('flagrow/fonts/main');
        }

        if ($event->isForum()) {
            $fontsUrl = app(FontManager::class)->googleFontsUrl();

            if ($fontsUrl) {
                $event->view->addHeadString('<link rel="stylesheet" href="' . $fontsUrl . '">', 'flagrow-fonts');
            }
        }
    }

    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }
}
