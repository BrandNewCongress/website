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

        $candidateCookieName = 'candidate';
        $controller->getContent()->data[$candidateCookieName] = [
            'url' => null,
            'name' => null,
            'slug' => null
        ];

        /*
         * Universal Candidate Cookie
         *
         * This needs to works with the StreamBundle\Controller\LandingCandidateController which sets the preferred candidate when
         * someone arrives to that landing page on the site.
         *
         * Check if there is a cookie indicating the user's preferred candidate
         * Add the values to the template for easy access
         */
        // If a candidate referrer is set, check that it's valid and save it
        if(!empty($request->query->get($candidateCookieName))) {

            // Candidate can be a full name or a slug, we'll clean it.
            $candidateData = [
                'url' => '/' . trim($request->getRequestUri(), '/'),
                'slug' => $this->makeCandidateSlug($request->query->get($candidateCookieName)),
                'name' => $this->expandCandidateSlug($request->query->get($candidateCookieName))
            ];
            // Set a cookie for the "last" candidate page visited.
            $controller->getEnv()->addCookie(
                new Cookie($candidateCookieName, json_encode($candidateData), time() + 36000, '/', null, false, false)
            );
        } else {
            if($request->cookies->has($candidateCookieName)) {
                $candidateData = json_decode($request->cookies->get($candidateCookieName), TRUE);
            }
        }
        if($request->cookies->has($candidateCookieName.'Last')) {
            $candidateDataLast = json_decode($request->cookies->get($candidateCookieName.'Last'), TRUE);
        }

        if(!empty($candidateData)) $controller->getContent()->data[$candidateCookieName] = $candidateData;
        if(!empty($candidateDataLast)) $controller->getContent()->data[$candidateCookieName.'Last'] = $candidateDataLast;


    }


    public function makeCandidateSlug($name) {
        $slug = strtolower($name);
        $slug = str_replace(' ', '-', $slug);
        $slug = preg_replace('~[^a-z-]+~', '', $slug);
        return $slug;
    }

    public function expandCandidateSlug($slug) {
        $name = str_replace('-', ' ', $slug);
        $name = ucwords($name);
        // add initials with period
        $name = preg_replace('~([A-Z]{1}) }~', '$1. ', $name);
        return $name;
    }
}