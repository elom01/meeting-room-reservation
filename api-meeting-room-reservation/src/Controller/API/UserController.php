<?php

namespace App\Controller\API;

use App\Entity\User;

class UserController
{

    public function __construct()
    {
    }

    public function __invoke(User $data)
    {
        return $data;
    }
}
