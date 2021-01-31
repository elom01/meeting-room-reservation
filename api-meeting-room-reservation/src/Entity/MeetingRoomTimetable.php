<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\MeetingRoomTimetableRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MeetingRoomTimetableRepository::class)
 * @ApiResource(
 * normalizationContext = {"groups"={"read:timetable"}},
 * denormalizationContext={"groups"={"write:timetable"}},
 * collectionOperations = {
 *  "get", 
 * "post" = {
 *      "controller"=App\Controller\API\TimetableCreateController::class
 * }},
 * itemOperations = {
 * "get",
 * "put" = {
 *      "controller"=App\Controller\API\TimetableUpdateController::class
 * },
 * "patch", 
 * "delete"
 * }
 * )
 * @ApiFilter(SearchFilter::class, properties={"meetingRoom.id":"exact"})
 */
class MeetingRoomTimetable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:meetingroom", "read:timetable"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=MeetingRoom::class, inversedBy="meetingRoomTimetables")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"write:meetingroom","read:timetable", "write:timetable"})
     */
    private $meetingRoom;

    /**
     * @ORM\Column(type="time")
     * @Groups({"read:meetingroom", "read:timetable","write:timetable"})
     */
    private $openingTime;

    /**
     * @ORM\Column(type="time")
     * @Groups({"read:meetingroom","read:timetable", "write:timetable"})
     */
    private $closureTime;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:meetingroom","read:timetable","write:timetable"})
     */
    private $openingDay;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creationDate;
    /**
     * @ORM\Column(type="datetime" , nullable=true)
     */
    private $updateDate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMeetingRoom(): ?MeetingRoom
    {
        return $this->meetingRoom;
    }

    public function setMeetingRoom(?MeetingRoom $meetingRoom): self
    {
        $this->meetingRoom = $meetingRoom;

        return $this;
    }

    public function getOpeningTime(): ?\DateTimeInterface
    {
        return $this->openingTime;
    }

    public function setOpeningTime(\DateTimeInterface $openingTime): self
    {
        $this->openingTime = $openingTime;

        return $this;
    }

    public function getClosureTime(): ?\DateTimeInterface
    {
        return $this->closureTime;
    }

    public function setClosureTime(\DateTimeInterface $closureTime): self
    {
        $this->closureTime = $closureTime;

        return $this;
    }

    public function getOpeningDay(): ?int
    {
        return $this->openingDay;
    }

    public function setOpeningDay(int $openingDay): self
    {
        $this->openingDay = $openingDay;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creationDate;
    }

    public function setCreationDate(\DateTimeInterface $creationDate): self
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    public function getUpdateDate(): ?\DateTimeInterface
    {
        return $this->updateDate;
    }

    public function setUpdateDate(?\DateTimeInterface $updateDate): self
    {
        $this->updateDate = $updateDate;

        return $this;
    }
}
