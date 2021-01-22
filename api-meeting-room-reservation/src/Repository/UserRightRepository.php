<?php

namespace App\Repository;

use App\Entity\UserRight;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserRight|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserRight|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserRight[]    findAll()
 * @method UserRight[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRightRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserRight::class);
    }

    // /**
    //  * @return UserRight[] Returns an array of UserRight objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserRight
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
