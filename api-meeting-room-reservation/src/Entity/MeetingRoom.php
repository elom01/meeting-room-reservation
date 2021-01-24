<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MeetingRoomRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MeetingRoomRepository::class)
 * @ApiResource
 */
class MeetingRoom
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:building"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:building"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $floor;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $imageUrl;

    /**
     * @ORM\ManyToOne(targetEntity=Building::class, inversedBy="meetingRooms")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:building"})
     */
    private $building;

    /**
     * @ORM\OneToMany(targetEntity=Meeting::class, mappedBy="meetingRoom")
     */
    private $meetings;

    /**
     * @ORM\OneToMany(targetEntity=MeetingRoomTimetable::class, mappedBy="meetingRoom")
     */
    private $meetingRoomTimetables;

    public function __construct()
    {
        $this->meetings = new ArrayCollection();
        $this->meetingRoomTimetables = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFloor(): ?string
    {
        return $this->floor;
    }

    public function setFloor(string $floor): self
    {
        $this->floor = $floor;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getBuilding(): ?Building
    {
        return $this->building;
    }

    public function setBuilding(?Building $building): self
    {
        $this->building = $building;

        return $this;
    }

    /**
     * @return Collection|Meeting[]
     */
    public function getMeetings(): Collection
    {
        return $this->meetings;
    }

    public function addMeeting(Meeting $meeting): self
    {
        if (!$this->meetings->contains($meeting)) {
            $this->meetings[] = $meeting;
            $meeting->setMeetingRoom($this);
        }

        return $this;
    }

    public function removeMeeting(Meeting $meeting): self
    {
        if ($this->meetings->removeElement($meeting)) {
            // set the owning side to null (unless already changed)
            if ($meeting->getMeetingRoom() === $this) {
                $meeting->setMeetingRoom(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MeetingRoomTimetable[]
     */
    public function getMeetingRoomTimetables(): Collection
    {
        return $this->meetingRoomTimetables;
    }

    public function addMeetingRoomTimetable(MeetingRoomTimetable $meetingRoomTimetable): self
    {
        if (!$this->meetingRoomTimetables->contains($meetingRoomTimetable)) {
            $this->meetingRoomTimetables[] = $meetingRoomTimetable;
            $meetingRoomTimetable->setMeetingRoom($this);
        }

        return $this;
    }

    public function removeMeetingRoomTimetable(MeetingRoomTimetable $meetingRoomTimetable): self
    {
        if ($this->meetingRoomTimetables->removeElement($meetingRoomTimetable)) {
            // set the owning side to null (unless already changed)
            if ($meetingRoomTimetable->getMeetingRoom() === $this) {
                $meetingRoomTimetable->setMeetingRoom(null);
            }
        }

        return $this;
    }
}
