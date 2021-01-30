<?php

declare(strict_types=1);

namespace App\Authorizations;

use App\Entity\Meeting;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class MeetingAuthorizationChecker
{
    private array $methodAllowed = [
        Request::METHOD_PUT,
        Request::METHOD_POST,
        Request::METHOD_PATCH,
        Request::METHOD_DELETE,
    ];

    private ?UserInterface $user;

    public function __construct(Security $security)
    {
        $this->user = $security->getUser();
    }

    public function check(Meeting $meeting, string $method): void
    {
        $this->isAuthenticated();
        if (
            $this->isMethodAllowed($method) &&
            $meeting->getUser()->getId() !== $this->user->getId()
        ) {
            $errorMessage = "User Not Allowed";
            throw new UnauthorizedHttpException($errorMessage, $errorMessage);
        }
    }

    public function isAuthenticated(): void
    {
        if (null === $this->user) {
            $error = "You are not authenticated";
            throw new UnauthorizedHttpException($error, $error);
        }
    }

    public function isMethodAllowed(string $method): bool
    {
        return in_array($method, $this->methodAllowed, true);
    }
}
