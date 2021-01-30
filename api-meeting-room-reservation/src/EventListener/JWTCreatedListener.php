<?php
 declare(strict_types=1);
 namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class JWTCreatedListener
 {
    
    private $requestStack;
    private $security;

    public function __construct(RequestStack $requestStack, Security $security)
    {
        $this->requestStack = $requestStack;
        $this->security = $security;
    }

    public function onJWTCreated(JWTCreatedEvent $event)
    {
      
        $resquest2 = $this->security->getUser();
        $payloadi       = $event->getData();
        $payloadi['id'] = $resquest2->getId();

        $event->setData($payloadi);
        
    }
 }
 