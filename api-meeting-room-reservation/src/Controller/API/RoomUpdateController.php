<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\MeetingRoom;
use Symfony\Component\Security\Core\Security;

class RoomUpdateController
{
    // private $bookPublishingHandler;

    public function __construct()
    {
    }

    public function __invoke(MeetingRoom $data)
    {
        $data->setUpdateDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
