<?php

namespace Flagrow\Fonts\Content;

use Flagrow\Fonts\Managers\FontManager;
use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface as Request;

class FontsStylesheet
{
    public function __invoke(Document $document, Request $request)
    {
        $document->head = array_merge($document->head, $this->buildHead());
    }

    private function buildHead()
    {
        $fontsUrl = app(FontManager::class)->googleFontsUrl();

        $head = [];

        if ($fontsUrl) {
            $head['flagrow-fonts'] = '<link rel="stylesheet" href="' . e($fontsUrl) . '">';
        }

        return $head;
    }
}
