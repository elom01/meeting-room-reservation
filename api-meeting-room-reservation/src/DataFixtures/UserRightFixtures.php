<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use App\Entity\Right;
use App\Entity\UserRight;
use Faker;

class UserRightFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        $user = new User();
        $user->setEmail("admin@admin.fr");
        $user->setUsername("admin@admin.fr");
        $user->setFamilyname("Admin");
        $user->setFirstname("User");
        $user->setPassword("admin");
        $user->setPhoneNumber("0123456789");
        $manager->persist($user);

        $rightAdmin = new Right();
        $rightAdmin->setLabel("admin");
        $manager->persist($rightAdmin);

        $right = new Right();
        $right->setLabel("user");
        $manager->persist($right);

        $userRight = new UserRight();
        $userRight->setCreationDate($faker->dateTime());
        $userRight->setRights($rightAdmin);
        $userRight->setUser($user);
        $manager->persist($userRight);

        $manager->flush();

        $manager->flush();
    }
}
