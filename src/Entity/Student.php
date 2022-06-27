<?php

namespace App\Entity;

use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=StudentRepository::class)
 */
class Student
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Submission::class, mappedBy="std")
     */
    private $file;

    /**
     * @ORM\ManyToOne(targetEntity=Group::class, inversedBy="students")
     * @ORM\JoinColumn(nullable=false)
     */
    private $gr;

    public function __construct()
    {
        $this->file = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
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

    /**
     * @return Collection<int, Submission>
     */
    public function getFile(): Collection
    {
        return $this->file;
    }

    public function addFile(Submission $file): self
    {
        if (!$this->file->contains($file)) {
            $this->file[] = $file;
            $file->setStd($this);
        }

        return $this;
    }

    public function removeFile(Submission $file): self
    {
        if ($this->file->removeElement($file)) {
            // set the owning side to null (unless already changed)
            if ($file->getStd() === $this) {
                $file->setStd(null);
            }
        }

        return $this;
    }

    public function getGr(): ?Group
    {
        return $this->gr;
    }

    public function setGr(?Group $gr): self
    {
        $this->gr = $gr;

        return $this;
    }
}
