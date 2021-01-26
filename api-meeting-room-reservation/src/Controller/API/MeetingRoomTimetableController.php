<?php

namespace App\Controller\API;

use App\Entity\MeetingRoomTimetable;

class MeetingRoomTimetableController
{
    public function __construct()
    {
    }

    public function __invoke(MeetingRoomTimetable $data)
    {
        return $data;
    }
}
