<?php

namespace Flagrow\Fonts\Api\Serializers;

use Flagrow\Fonts\Managers\FontManager;
use Flarum\Api\Serializer\AbstractSerializer;
use Illuminate\Support\Arr;

class FontSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'flagrow-fonts';

    /**
     * {@inheritdoc}
     */
    public function getId($font)
    {
        return Arr::get($font, 'family');
    }

    /**
     * {@inheritdoc}
     */
    public function getDefaultAttributes($font)
    {
        $manager = app(FontManager::class);

        $family = Arr::get($font, 'family');

        return [
            'family' => $family,
            'category' => Arr::get($font, 'category'),
            'variants' => array_map(function($variant) use($manager, $family) {
                return [
                    'key' => $variant,
                    'enabled' => $manager->isVariantEnabled($family, $variant),
                ];
            }, Arr::get($font, 'variants')),
            'enabled' => $manager->isFontEnabled($family),
        ];
    }
}
