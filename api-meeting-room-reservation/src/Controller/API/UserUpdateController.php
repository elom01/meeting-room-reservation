<?php

namespace App\Controller\API;

use DateTimeZone;
use App\Entity\User;
use DateTimeImmutable;

class UserUpdateController
{

    public function __construct()
    {
    }

    public function __invoke(User $data)
    {
        $data->setUpdateDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
