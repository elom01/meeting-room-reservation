<?php

namespace App\Controller\API;

use DateTimeZone;
use App\Entity\User;
use DateTimeImmutable;

class UserCreateController
{

    public function __construct()
    {
    }

    public function __invoke(User $data)
    {
        $data->setUsername($data->getEmail());
        $data->setCreationDate(new DateTimeImmutable("now", new DateTimeZone("Europe/Paris")));
        return $data;
    }
}
