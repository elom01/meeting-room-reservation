<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRightRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRightRepository::class)
 * @ApiResource(
 * normalizationContext={"groups"={"write:userright"}},
 * denormalizationContext={"groups"={"write:userright"}},
 * )
 */
class UserRight
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:userright"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="userRights")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:userright","write:userright"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Right::class, inversedBy="userRights")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:userright","write:userright"})
     */
    private $rights;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creationDate;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getRights(): ?Right
    {
        return $this->rights;
    }

    public function setRights(?Right $rights): self
    {
        $this->rights = $rights;

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
}
