<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\RightRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=RightRepository::class)
 * @ORM\Table(name="`right`")
 * @ApiResource
 */
class Right
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:userright", "write:userright"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:userright"})
     */
    private $label;

    /**
     * @ORM\OneToMany(targetEntity=UserRight::class, mappedBy="rights")
     */
    private $userRights;

    public function __construct()
    {
        $this->userRights = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return Collection|UserRight[]
     */
    public function getUserRights(): Collection
    {
        return $this->userRights;
    }

    public function addUserRight(UserRight $userRight): self
    {
        if (!$this->userRights->contains($userRight)) {
            $this->userRights[] = $userRight;
            $userRight->setRights($this);
        }

        return $this;
    }

    public function removeUserRight(UserRight $userRight): self
    {
        if ($this->userRights->removeElement($userRight)) {
            // set the owning side to null (unless already changed)
            if ($userRight->getRights() === $this) {
                $userRight->setRights(null);
            }
        }

        return $this;
    }
}
