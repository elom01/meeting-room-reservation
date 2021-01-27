<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\MeetingRoomTimetable;

class TimetableCreateController
{
    public function __construct()
    {
    }

    public function __invoke(MeetingRoomTimetable $data)
    {
        $data->setCreationDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
