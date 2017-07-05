<?php

namespace Flagrow\Fonts\Managers;

use Flagrow\Fonts\Repositories\FontRepository;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Support\Arr;

class FontManager
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var FontRepository
     */
    protected $repository;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param FontRepository $repository
     */
    function __construct(SettingsRepositoryInterface $settings, FontRepository $repository)
    {
        $this->settings = $settings;
        $this->repository = $repository;
    }

    protected function settingsKey()
    {
        return 'flagrow.fonts.enabled_fonts';
    }

    /**
     * Get the list of enabled fonts from the settings
     * @return array
     */
    protected function getEnabledFonts()
    {
        return json_decode($this->settings->get($this->settingsKey(), '{}'), true);
    }

    /**
     * Save the list of enabled fonts to the settings
     * @param array $fonts
     */
    protected function saveEnabledFonts($fonts)
    {
        $this->settings->set($this->settingsKey(), json_encode($fonts));
    }

    /**
     * Enable a given font for the given variants
     * @param string $family Font name
     * @param array $variants Variants to enable
     * @throws \Exception
     */
    public function enable($family, array $variants)
    {
        // If no variant was selected, it's the same as disabling
        if (count($variants) === 0) {
            $this->disable($family);
            return;
        }

        $fonts = $this->getEnabledFonts();

        $font = $this->repository->get($family);

        if (!$font) {
            throw new \Exception('Invalid font');
        }

        $fonts[$family] = [
            'type' => 'google',
            'category' => Arr::get($font, 'category'),
            'variants' => $variants,
        ];

        $this->saveEnabledFonts($fonts);
    }

    /**
     * Disable a given font
     * @param string $family Font name
     */
    public function disable($family)
    {
        // Get all currently enabled font except the one we try to disable
        $fonts = Arr::except($this->getEnabledFonts(), $family);

        $this->saveEnabledFonts($fonts);
    }

    /**
     * Checks if a font is enabled
     * @param string $family
     * @return bool
     */
    public function isFontEnabled($family)
    {
        return Arr::has($this->getEnabledFonts(), $family);
    }

    /**
     * Checks if a font variant is enabled
     * @param string $family
     * @param string $variant
     * @return bool
     */
    public function isVariantEnabled($family, $variant)
    {
        $font = Arr::get($this->getEnabledFonts(), $family);

        return $font && in_array($variant, Arr::get($font, 'variants', []));
    }

    /**
     * Generate the Google Fonts CSS url for all fonts enabled
     * @return null|string
     */
    public function googleFontsUrl()
    {
        $fonts = $this->getEnabledFonts();

        if (count($fonts) === 0) {
            return null;
        }

        $family_query = implode('|', array_map(function($font, $family) {
            return $family . ':' . implode(',', Arr::get($font, 'variants', []));
        }, $fonts, array_keys($fonts)));

        return 'https://fonts.googleapis.com/css?family=' . urlencode($family_query);
    }
}
