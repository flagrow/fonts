<?php

namespace Flagrow\Fonts\Repositories;

use Flagrow\Fonts\Managers\FontManager;
use Flagrow\Fonts\Search\GoogleFontsApi;
use Flarum\Search\SearchResults;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;

class FontRepository
{
    /**
     * Get fonts from the cache or use the API to refresh it
     * @param array $options
     * @return Collection
     * @throws \Exception
     */
    protected function fetchFonts(array $options = [])
    {
        $api = app(GoogleFontsApi::class);

        $sort = Arr::get($options, 'sort', GoogleFontsApi::SORT_POPULARITY);
        $hash = 'google-fonts-' . $sort;

        // "enabled" is a special sort type. We will fetch fonts alphabetically and only return those enabled
        $onlyEnabled = $sort === 'enabled';
        if ($onlyEnabled) {
            $sort = GoogleFontsApi::SORT_ALPHA;
        }

        $cache = app(Store::class);

        $fontsList = $cache->get($hash);

        if (!$fontsList) {
            $fontsList = $api->get([
                'sort' => $sort,
            ]);

            $cache->put($hash, $fontsList, 60);
        }

        $fonts = new Collection($fontsList);

        if ($onlyEnabled) {
            $manager = app(FontManager::class);

            $fonts = $fonts->filter(function ($font) use ($manager) {
                return $manager->isFontEnabled(Arr::get($font, 'family'));
            });
        }

        foreach (Arr::get($options, 'filter', []) as $filter => $value) {
            switch ($filter) {
                case 'search':
                    $fonts = $fonts->filter(function ($font) use ($value) {
                        if (empty($value)) {
                            return true;
                        }

                        return strpos(strtolower(Arr::get($font, 'family', '')), strtolower($value)) !== false;
                    });
                    break;
                default:
                    throw new \Exception('Invalid font filter ' . $filter);
            }
        }

        return $fonts;
    }

    /**
     * Listing of the fonts
     * @param array $options
     * @return SearchResults
     */
    public function index(array $options)
    {
        $fonts = $this->fetchFonts($options);

        $page_number = intval(Arr::get($options, 'page.offset', 0) + 1);
        $page_size = intval(Arr::get($options, 'page.size', 20)); // TODO: never used

        $paged = $fonts->forPage(
            $page_number,
            $page_size
        );

        $has_more_pages = $page_number * $page_size < $fonts->count();

        return new SearchResults($paged, $has_more_pages);
    }

    /**
     * Access to a given font
     * @param string $family Name of the font
     * @return array|null Data for the font
     */
    public function get($family)
    {
        $fonts = $this->fetchFonts();

        return $fonts->where('family', $family)->first();
    }
}
