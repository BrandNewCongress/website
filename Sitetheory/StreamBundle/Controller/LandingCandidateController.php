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
         * Check if this is the first page someone visits on the site, e.g. someone came directly to
         * this candidate landing page either by typing in the URL or from another site. That means
         * that this candidate is the one they are most interested in.
         *
         * Then this cookie is checked in the TemplateCustomBundle\Controller\InitController.php and it sets
         * data attributes that the shell looks for.
         */
        $candidateCookieName = 'candidate';
        if(empty($controller->getEnv()->getReferrer())
            || !$controller->getEnvHelper()->isInternalReferrer($request, $controller->getEnv()->getReferrer())
        ) {

            $candidateCookieValue = [
                'url' => '/' . trim($request->getRequestUri(), '/'),
                'name' => $controller->getContent()->getVersion()->getTitle()
            ];
            // Set a cookie to specify that this candidate is the primary candidate they are interested
            $controller->getEnv()->addCookie(
                    new Cookie($candidateCookieName, json_encode($candidateCookieValue), time() + 36000, '/', null, false, false)
            );

        }



        parent::indexAction($request, $controller);
    }

}
