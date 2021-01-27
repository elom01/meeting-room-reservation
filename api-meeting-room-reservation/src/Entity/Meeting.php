<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MeetingRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MeetingRepository::class)
 * @ApiResource(
 *  normalizationContext = {"groups"={"read:meeting"}},
 *  denormalizationContext={"groups"={"write:meeting"}},
 *  collectionOperations = {
 * "get", 
 * "post" = {
 *      "controller"=App\Controller\API\MeetingCreateController::class
 * }},
 * 
 * itemOperations = {
 * "get",
 * "put" = {
 *      "controller"=App\Controller\API\MeetingUpdateController::class
 * },
 * "patch", 
 * "delete"}
 * )
 */
class Meeting
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:meetingroom", "read:meeting","read:user"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:meetingroom", "read:meeting", "write:meeting","read:user"})
     */
    private $startDate;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"read:meetingroom", "read:meeting", "write:meeting","read:user"})
     */
    private $endDate;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="meetings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:meeting", "write:meeting"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=MeetingRoom::class, inversedBy="meetings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:meeting", "write:meeting"})
     */
    private $meetingRoom;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creationDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updateDate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
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
