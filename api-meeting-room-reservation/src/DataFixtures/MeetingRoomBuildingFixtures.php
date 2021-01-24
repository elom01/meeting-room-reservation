<?php

namespace App\DataFixtures;

use App\Entity\Building;
use App\Entity\MeetingRoom;
use App\Entity\MeetingRoomTimetable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class MeetingRoomBuildingFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Faker\Factory::create('fr_FR');

        $building = [];
        for ($i = 0; $i < 10; $i++) {
            $building[$i] = new Building();

            $fakerName = $faker->word;
            $fakerAddress = $faker->address;
            $streetAddress  = preg_split("/[\n]/", $fakerAddress)[0];
            $fakerCityZipCode = preg_split("/[\n]/", $fakerAddress)[1];
            $arrayCityZipCode = preg_split('/ /', $fakerCityZipCode, -1, PREG_SPLIT_NO_EMPTY);
            if (strlen($arrayCityZipCode[0]) > 2) {
                $fakerZipCode = $arrayCityZipCode[0];
            } else {
                $fakerZipCode = "$arrayCityZipCode[0] $arrayCityZipCode[1]";
            }

            $fakerCity = str_replace($fakerZipCode, "", $fakerCityZipCode);
            $building[$i]->setAddress($streetAddress)
                ->setCity($fakerCity)
                ->setName($fakerName)
                ->setZipcode(str_replace(" ", "", $fakerZipCode));
            $manager->persist($building[$i]);
        }

        // $openingTime = date("08:00:00");
        // $closureTime = date("18:00:00");

        $openingTime = date_create();
        date_time_set($openingTime, 8, 00);
        $closureTime = date_create();
        date_time_set($closureTime, 18, 00);

        $meetingRoom = [];
        for ($k = 0; $k < 50; $k++) {
            $meetingRoom[$k] = new MeetingRoom();
            $meetingRoom[$k]->setName($faker->colorName)
                ->setFloor($faker->randomDigitNotNull)
                ->setImageUrl("https://cdn.pixabay.com/photo/2015/05/15/14/22/conference-room-768441_960_720.jpg");

            // on récupère un nombre aléatoire de meetingRoom dans un tableau
            $randommeetingRoom = (array) array_rand($building, rand(1, count($building)));
            // puis on les ajoute au Customer
            foreach ($randommeetingRoom as $key => $value) {
                $meetingRoom[$k]->setBuilding($building[$key]);
            }
            $manager->persist($meetingRoom[$k]);



            for ($j = 0; $j < 7; $j++) {
                $meetingRoomTimetable[$j] = new MeetingRoomTimetable();
                $meetingRoomTimetable[$j]->setOpeningDay($j)
                    ->setOpeningTime($openingTime)
                    ->setClosureTime($closureTime)
                    ->setUpdateDate($openingTime)
                    ->setMeetingRoom($meetingRoom[$k]);
                $manager->persist($meetingRoomTimetable[$j]);
            }
        }


        $manager->flush();
    }
}
