<?php

declare(strict_types=1);

namespace App\Events;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use App\Authorizations\UserAuthorizationChecker;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Authorizations\MeetingAuthorizationChecker;
use App\Entity\Meeting;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MeetingSubscriber implements EventSubscriberInterface
{

    private array $methodNotAllowed = [
        Request::METHOD_POST,
        Request::METHOD_GET
    ];

    private MeetingAuthorizationChecker $meetingAuthorizationChecker;

    public function __construct(MeetingAuthorizationChecker $meetingAuthorizationChecker)
    {
        $this->meetingAuthorizationChecker = $meetingAuthorizationChecker;
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

        if (
            $meeting instanceof Meeting &&
            !in_array($method, $this->methodNotAllowed, true)
        ) {
            $this->meetingAuthorizationChecker->check($meeting, $method);
            $meeting->setUpdateDate(new \DateTimeImmutable());
        }
    }
}
