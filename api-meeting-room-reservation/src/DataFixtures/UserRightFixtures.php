<?php

namespace App\DataFixtures;

use Faker;
use App\Entity\User;
use App\Entity\Right;
use App\Entity\UserRight;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserRightFixtures extends Fixture
{
    private UserPasswordEncoderInterface $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        $user = new User();
        $passHash = $this->encoder->encodePassword($user, 'password');
        $dateNow = date_create();

        $user->setEmail("admin@mail.fr")
        ->setUsername("admin@mail.fr")
        ->setFamilyname("Admin")
        ->setFirstname("User")
        ->setPassword($passHash)
        ->setPhoneNumber("0123456789")
        ->setRoles(array('ROLE_ADMIN'))
        ->setCreationDate($dateNow);

        $manager->persist($user);

        $rightAdmin = new Right();
        $rightAdmin->setLabel("admin");
        $manager->persist($rightAdmin);

        $right = new Right();
        $right->setLabel("user");
        $manager->persist($right);

        $userRight = new UserRight();
        $userRight->setCreationDate($faker->dateTime())
        ->setRights($rightAdmin)
        ->setUser($user);
        $manager->persist($userRight);

        $manager->flush();

        $manager->flush();
    }
}
