<?php

namespace Flagrow\Fonts\Api\Controllers;

use Flagrow\Fonts\Api\Serializers\FontSerializer;
use Flagrow\Fonts\Managers\FontManager;
use Flagrow\Fonts\Repositories\FontRepository;
use Flarum\Api\Controller\AbstractShowController;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ToggleFontController extends AbstractShowController
{
    use AssertPermissionTrait;

    /**
     * @inheritdoc
     */
    public $serializer = FontSerializer::class;

    /**
     * @var FontManager
     */
    protected $manager;

    /**
     * @var FontRepository
     */
    protected $fonts;

    function __construct(FontManager $manager, FontRepository $fonts)
    {
        $this->manager = $manager;
        $this->fonts = $fonts;
    }

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $family = urldecode(Arr::get($request->getQueryParams(), 'family'));
        $variants = Arr::get($request->getParsedBody(), 'variants', []);

        $this->manager->enable($family, $variants);

        return $this->fonts->get($family);
    }
}
