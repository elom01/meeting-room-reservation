<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\Building;
use Symfony\Component\Security\Core\Security;

class BuildingCreateController
{
    // private $bookPublishingHandler;

    public function __construct()
    {
    }

    public function __invoke(Building $data)
    {

        $data->setCreationDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
