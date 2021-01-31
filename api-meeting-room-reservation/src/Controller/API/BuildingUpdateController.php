<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\Building;
use Symfony\Component\Security\Core\Security;

class BuildingUpdateController
{
    // private $bookPublishingHandler;

    public function __construct()
    {
    }

    public function __invoke(Building $data)
    {
        $data->setUpdateDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
