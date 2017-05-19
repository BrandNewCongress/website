<?php

namespace Sitetheory\StreamBundle\Controller;

use Sitetheory\StreamBundle\Controller\LandingController;
use Symfony\Component\HttpFoundation\Request;
use Sitetheory\CoreBundle\Controller\InitController;
use Symfony\Component\HttpFoundation\Cookie;

/**
 * Class LandingController
 * @package Sitetheory\StreamBundle\Controller
 */
class LandingCandidateController extends LandingController
{


    /**
     * Add custom functionality to the standard LandingController
     * @param Request $request
     * @param InitController $controller
     */
    public function indexAction(Request $request, InitController $controller)
    {

        /*
         * This works with the TemplateController which does this for specific parameter requests. This should overwrite.
         * Check if this is the first page someone visits on the site, e.g. someone came directly to
         * this candidate landing page either by typing in the URL or from another site. That means
         * that this candidate is the one they are most interested in.
         *
         * Then this cookie is checked in the TemplateCustomBundle\Controller\InitController.php and it sets
         * data attributes that the shell looks for in order to create a custom environment, e.g. add a button to go
         * back to the candidate landing page.
         *
         * But we need to track both the preferred candidate and the "last" candidate, so that going from one candidate to a volunteer form will work for that candidate
         */

        $candidateData = [
            'url' => '/' . trim($request->getRequestUri(), '/'),
            'name' => $controller->getContent()->getVersion()->getTitle(),
            'slug' => $this->makeCandidateSlug($controller->getContent()->getVersion()->getTitle())
        ];
        // Set a cookie for the "last" candidate page visited.
        $controller->getEnv()->addCookie(
            new Cookie('candidateLast', json_encode($candidateData), time() + 36000, '/', null, false, false)
        );

        if(function_exists('dump')) dump('set candidate data', $candidateData);

        if(empty($controller->getEnv()->getReferrer())
            || !$controller->getEnvHelper()->isInternalReferrer($request, $controller->getEnv()->getReferrer())
        ) {
            // Set a cookie to specify that this candidate is the primary candidate they are interested
            $controller->getEnv()->addCookie(new Cookie('candidate', json_encode($candidateData), time() + 36000, '/', null, false, false));
        }

        parent::indexAction($request, $controller);
    }

    public function makeCandidateSlug($name) {
        $slug = strtolower($name);
        $slug = str_replace(' ', '-', $slug);
        $slug = preg_replace('~[^a-z-]+~', '', $slug);
        return $slug;
    }

}
