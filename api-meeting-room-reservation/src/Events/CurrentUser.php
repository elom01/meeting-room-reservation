<?php

declare(strict_types=1);

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Meeting;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CurrentUser implements EventSubscriberInterface
{

    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return  [
            KernelEvents::VIEW => ['currentUser', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function currentUser(ViewEvent $event): void
    {
        $meeting = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($meeting instanceof Meeting && Request::METHOD_POST === $method) {
            $meeting->setUser($this->security->getUser());
        }
    }
}
