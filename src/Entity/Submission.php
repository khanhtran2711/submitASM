<?php

namespace App\Entity;

use App\Repository\SubmissionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=SubmissionRepository::class)
 */
class Submission
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
    private $gitHubLink;

    /**
     * @ORM\Column(type="string", length=255,nullable=true)
     */
    private $fileUrl;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=Student::class, inversedBy="file")
     * @ORM\JoinColumn(nullable=true)
     */
    private $std;

    /**
     * @ORM\Column(type="string", length=255,nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255,nullable=true)
     */
    private $size;

    /**
     * @ORM\Column(type="blob",nullable=true)
     */
    private $content;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGitHubLink(): ?string
    {
        return $this->gitHubLink;
    }

    public function setGitHubLink(string $gitHubLink): self
    {
        $this->gitHubLink = $gitHubLink;

        return $this;
    }

    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(string $fileUrl): self
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getStd(): ?Student
    {
        return $this->std;
    }

    public function setStd(?Student $std): self
    {
        $this->std = $std;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(string $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setContent($content): self
    {
        $this->content = $content;

        return $this;
    }
}
