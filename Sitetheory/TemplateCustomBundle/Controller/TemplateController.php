<?php

namespace Sitetheory\TemplateCustomBundle\Controller;

use Sitetheory\CoreBundle\Controller\InitController;
use Sitetheory\TemplateBundle\Controller\TemplateControllerBase;
use Symfony\Component\HttpFoundation\Request;

/**
 * Unique Controllers necessary for this template.
 * Class InitController
 * @package Sitetheory\TemplateCustomBundle\Controller
 */
class TemplateController extends TemplateControllerBase
{

    /**
     * @param Request $request
     * @param InitController $controller
     * @param mixed|array|null $options
     */
    public function indexAction(Request $request, InitController $controller, $options = [])
    {

        /*
         * This Works with the StreamBundle\Controller\LandingCandidateController which sets the preferred candidate when
         * someone arrives to that landing page on the site.
         *
         * Check if there is a cookie indicating the user's preferred candidate
         * Add the values to the template for easy access
         */
        $candidateCookieName = 'candidate';
        $controller->getContent()->data['candidate'] = [
            'url' => null,
            'name' => null
        ];
        if($request->cookies->has($candidateCookieName)) {
            $candidateData = json_decode($request->cookies->get($candidateCookieName));
            if(!empty($candidateData->url)) $controller->getContent()->data['candidate']['url'] = $candidateData->url;
            if(!empty($candidateData->name)) $controller->getContent()->data['candidate']['name'] = $candidateData->name;
        }


    }
}