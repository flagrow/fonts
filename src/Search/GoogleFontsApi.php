<?php

namespace Flagrow\Fonts\Search;

use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client;
use Illuminate\Support\Arr;

/**
 * Google Font Api helper
 * Based on https://developers.google.com/fonts/docs/developer_api
 */
class GoogleFontsApi
{
    const SORT_ALPHA = 'alpha';
    const SORT_DATE = 'date';
    const SORT_POPULARITY = 'popularity';
    const SORT_STYLE = 'style';
    const SORT_TRENDING = 'trending';

    /**
     * @var Client
     */
    protected $client;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * GoogleFontsApi constructor.
     * @param SettingsRepositoryInterface $settings
     */
    function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * @return Client
     */
    protected function getClient()
    {
        if (!$this->client) {
            $this->client = new Client();
        }

        return $this->client;
    }

    /**
     * Get the Google API key from the settings
     * @return string
     * @throws \Exception
     */
    protected function apiKey()
    {
        $key = $this->settings->get('flagrow.fonts.google_api_key');

        if (!$key) {
            throw new \Exception('No Google Fonts API Key set');
        }

        return $key;
    }

    /**
     * Performs a Google Font Api request
     * @param array $options
     * @return array List of fonts
     */
    public function get(array $options = [])
    {
        $response = $this->getClient()->get('https://www.googleapis.com/webfonts/v1/webfonts', [
            'query' => [
                'key' => $this->apiKey(),
                'sort' => Arr::get($options, 'sort', self::SORT_POPULARITY),
            ],
        ]);

        $data = json_decode($response->getBody(), true);

        return $data['items'];
    }
}
