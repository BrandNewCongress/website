<?php

namespace Sitetheory\TemplateCustomBundle\Controller;

use Sitetheory\CoreBundle\Controller\InitController;
use Sitetheory\TemplateBundle\Controller\TemplateControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Cookie;

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
        $candidateData = [
            'url' => null,
            'name' => null,
            'slug' => null
        ];
        $candidateDataLast = $candidateData;



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

            $slug = $this->makeCandidateSlug($request->query->get($candidateCookieName));

            // Candidate can be a full name or a slug, we'll clean it.
            $candidateData = [
                // We set the URL on the Candidate's page, but if on another page they ask for a specific candidate
                // We'll use that slug for the return URL
                'url' => '/'.$slug,
                'slug' => $slug,
                'name' => $this->expandCandidateSlug($request->query->get($candidateCookieName))
            ];
            // Also mark the candidate as the Last Candidate
            $candidateDataLast = $candidateData;
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

        $env = $controller->getEnv();
        if ($env->isDev() && $env->isDebug() && function_exists('dump')) dump($candidateData, $candidateDataLast);

        // No matter what, we always set a value
        $controller->getContent()->data[$candidateCookieName] = $candidateData;
        $controller->getContent()->data[$candidateCookieName.'Last'] = $candidateDataLast;


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