<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210122050734 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE building (id INT AUTO_INCREMENT NOT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zipcode VARCHAR(5) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE meeting (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, meeting_room_id INT NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME NOT NULL, creation_date DATETIME NOT NULL, update_date DATETIME DEFAULT NULL, INDEX IDX_F515E139A76ED395 (user_id), INDEX IDX_F515E139CCC5381E (meeting_room_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE meeting_room (id INT AUTO_INCREMENT NOT NULL, building_id INT NOT NULL, name VARCHAR(255) NOT NULL, floor VARCHAR(255) NOT NULL, image_url VARCHAR(255) DEFAULT NULL, INDEX IDX_9E6EA9494D2A7E12 (building_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE meeting_room_timetable (id INT AUTO_INCREMENT NOT NULL, meeting_room_id INT NOT NULL, opening_time TIME NOT NULL, closure_time TIME NOT NULL, opening_day INT NOT NULL, update_date DATETIME NOT NULL, INDEX IDX_1B13F058CCC5381E (meeting_room_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `right` (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, familyname VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone_number VARCHAR(20) DEFAULT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_right (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, rights_id INT NOT NULL, creation_date DATETIME NOT NULL, INDEX IDX_56088E4CA76ED395 (user_id), INDEX IDX_56088E4CB196EE6E (rights_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE meeting ADD CONSTRAINT FK_F515E139A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE meeting ADD CONSTRAINT FK_F515E139CCC5381E FOREIGN KEY (meeting_room_id) REFERENCES meeting_room (id)');
        $this->addSql('ALTER TABLE meeting_room ADD CONSTRAINT FK_9E6EA9494D2A7E12 FOREIGN KEY (building_id) REFERENCES building (id)');
        $this->addSql('ALTER TABLE meeting_room_timetable ADD CONSTRAINT FK_1B13F058CCC5381E FOREIGN KEY (meeting_room_id) REFERENCES meeting_room (id)');
        $this->addSql('ALTER TABLE user_right ADD CONSTRAINT FK_56088E4CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_right ADD CONSTRAINT FK_56088E4CB196EE6E FOREIGN KEY (rights_id) REFERENCES `right` (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE meeting_room DROP FOREIGN KEY FK_9E6EA9494D2A7E12');
        $this->addSql('ALTER TABLE meeting DROP FOREIGN KEY FK_F515E139CCC5381E');
        $this->addSql('ALTER TABLE meeting_room_timetable DROP FOREIGN KEY FK_1B13F058CCC5381E');
        $this->addSql('ALTER TABLE user_right DROP FOREIGN KEY FK_56088E4CB196EE6E');
        $this->addSql('ALTER TABLE meeting DROP FOREIGN KEY FK_F515E139A76ED395');
        $this->addSql('ALTER TABLE user_right DROP FOREIGN KEY FK_56088E4CA76ED395');
        $this->addSql('DROP TABLE building');
        $this->addSql('DROP TABLE meeting');
        $this->addSql('DROP TABLE meeting_room');
        $this->addSql('DROP TABLE meeting_room_timetable');
        $this->addSql('DROP TABLE `right`');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_right');
    }
}
