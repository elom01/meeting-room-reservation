<?php

namespace App\Controller\API;

use App\Entity\Meeting;
use Symfony\Component\Security\Core\Security;

class MeetingController
{
    // private $bookPublishingHandler;

    public function __construct()
    {
    }

    public function __invoke(Meeting $data)
    {


        return $data;
    }
}
