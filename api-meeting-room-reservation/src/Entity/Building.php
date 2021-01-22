<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BuildingRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass=BuildingRepository::class)
 * @ApiResource
 */
class Building
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=5)
     */
    private $zipcode;

    /**
     * @ORM\OneToMany(targetEntity=MeetingRoom::class, mappedBy="building")
     */
    private $meetingRooms;

    public function __construct()
    {
        $this->meetingRooms = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    /**
     * @return Collection|MeetingRoom[]
     */
    public function getMeetingRooms(): Collection
    {
        return $this->meetingRooms;
    }

    public function addMeetingRoom(MeetingRoom $meetingRoom): self
    {
        if (!$this->meetingRooms->contains($meetingRoom)) {
            $this->meetingRooms[] = $meetingRoom;
            $meetingRoom->setBuilding($this);
        }

        return $this;
    }

    public function removeMeetingRoom(MeetingRoom $meetingRoom): self
    {
        if ($this->meetingRooms->removeElement($meetingRoom)) {
            // set the owning side to null (unless already changed)
            if ($meetingRoom->getBuilding() === $this) {
                $meetingRoom->setBuilding(null);
            }
        }

        return $this;
    }
}
