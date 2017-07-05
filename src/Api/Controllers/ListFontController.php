<?php

namespace Flagrow\Fonts\Api\Controllers;

use Flagrow\Fonts\Api\Serializers\FontSerializer;
use Flagrow\Fonts\Repositories\FontRepository;
use Flarum\Api\Controller\AbstractCollectionController;
use Flarum\Api\UrlGenerator;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListFontController extends AbstractCollectionController
{
    use AssertPermissionTrait;

    /**
     * @inheritdoc
     */
    public $serializer = FontSerializer::class;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @var FontRepository
     */
    protected $fonts;

    /**
     * @param UrlGenerator $url
     * @param FontRepository $fonts
     */
    public function __construct(UrlGenerator $url, FontRepository $fonts)
    {
        $this->url = $url;
        $this->fonts = $fonts;
    }

    /**
     * @inheritdoc
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $offset = $this->extractOffset($request);

        $results = $this->fonts->index($request->getQueryParams());

        $document->addPaginationLinks(
            $this->url->toRoute('flagrow.fonts.index'),
            $request->getQueryParams(),
            $offset,
            1, // Add one to the offset to get next page number
            $results->areMoreResults() ? null : 0
        );

        return $results->getResults();
    }
}
