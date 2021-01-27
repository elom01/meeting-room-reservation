<?php

namespace App\Controller\API;

use DateTimeZone;
use DateTimeImmutable;
use App\Entity\MeetingRoomTimetable;

class TimetableUpdateController
{
    public function __construct()
    {
    }

    public function __invoke(MeetingRoomTimetable $data)
    {
        $data->setUpdateDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
