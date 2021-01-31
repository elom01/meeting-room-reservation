<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\MeetingRoom;
use Symfony\Component\Security\Core\Security;

class RoomCreateController
{
    // private $bookPublishingHandler;

    public function __construct()
    {
    }

    public function __invoke(MeetingRoom $data)
    {

        $data->setCreationDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
