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
     */
    public function indexAction(Request $request, InitController $controller)
    {

        $candidateHelper = $controller->container->get('bnc_core.candidate_helper');
        $candidateHelper->getCandidateTracking($request, $controller);

    }

}