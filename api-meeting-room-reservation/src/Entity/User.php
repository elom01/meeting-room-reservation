<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity({"email", "username"})
 * @ApiResource(
 * normalizationContext={"groups"={"read:user"}},
 * denormalizationContext={"groups"={"write:user"}},
 * collectionOperations = {
 *  "get", 
 * "post" = {
 *      "controller"=App\Controller\API\UserCreateController::class
 * }},
 * itemOperations = {
 * "get",
 * "put" = {
 *      "controller"=App\Controller\API\UserUpdateController::class
 * } ,
 * "patch", 
 * "delete"}
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:meetingroom", "read:user","read:meeting", "write:meeting", "read:userright", "write:userright"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:user","read:meeting","write:user", "read:userright"})
     */
    private $familyname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:user","read:meeting","write:user", "read:userright"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:user","read:meeting","write:user", "read:userright"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"read:user","read:meeting","write:user", "read:userright"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     * @Groups({"read:user","read:meeting","write:user", "read:userright"})
     */
    private $phoneNumber;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", length=255)
     * @Groups({"write:user"})
     */
    private $password;

    /**
     * @ORM\Column(type="datetime")
     */
    private $creationDate;
    /**
     * @ORM\Column(type="datetime" , nullable=true)
     */
    private $updateDate;

    /**
     * @ORM\OneToMany(targetEntity=UserRight::class, mappedBy="user")
     * @Groups({"write:user"})
     */

    private $userRights;

    /**
     * @ORM\OneToMany(targetEntity=Meeting::class, mappedBy="user")
     * @Groups({"read:user"})
     */
    private $meetings;

    public function __construct()
    {
        $this->userRights = new ArrayCollection();
        $this->meetings = new ArrayCollection();
    }

    /**
     * @see UserInterface
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFamilyname(): ?string
    {
        return $this->familyname;
    }

    public function setFamilyname(string $familyname): self
    {
        $this->familyname = $familyname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
    /**
     * @see UserInterface
     */
    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

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
            $userRight->setUser($this);
        }

        return $this;
    }

    public function removeUserRight(UserRight $userRight): self
    {
        if ($this->userRights->removeElement($userRight)) {
            // set the owning side to null (unless already changed)
            if ($userRight->getUser() === $this) {
                $userRight->setUser(null);
            }
        }

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
            $meeting->setUser($this);
        }

        return $this;
    }

    public function removeMeeting(Meeting $meeting): self
    {
        if ($this->meetings->contains($meeting)) {
            $this->meetings->removeElement($meeting);
        }

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

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }


    /**
     * @see UserInterface
     */

    public function getSalt()
    {
        // you *may* need a real salt depending on your encoder
        // see section on salt below
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
    }
}
