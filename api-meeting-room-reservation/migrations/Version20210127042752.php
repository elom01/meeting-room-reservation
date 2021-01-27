<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210127042752 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE building ADD creation_date DATETIME NOT NULL, ADD update_date DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE meeting_room ADD creation_date DATETIME NOT NULL, ADD update_date DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE meeting_room_timetable ADD creation_date DATETIME NOT NULL, CHANGE update_date update_date DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD creation_date DATETIME NOT NULL, ADD update_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE building DROP creation_date, DROP update_date');
        $this->addSql('ALTER TABLE meeting_room DROP creation_date, DROP update_date');
        $this->addSql('ALTER TABLE meeting_room_timetable DROP creation_date, CHANGE update_date update_date DATETIME NOT NULL');
        $this->addSql('ALTER TABLE user DROP creation_date, DROP update_date');
    }
}
