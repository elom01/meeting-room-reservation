<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\Meeting;
use Symfony\Component\Security\Core\Security;

class BuildingCreateController
{
    // private $bookPublishingHandler;

    public function __construct()
    {
    }

    public function __invoke(Meeting $data)
    {

        $data->setCreationDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
