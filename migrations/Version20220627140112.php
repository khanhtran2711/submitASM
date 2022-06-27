<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220627140112 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33EA000B10');
        $this->addSql('DROP INDEX IDX_B723AF33EA000B10 ON student');
        $this->addSql('ALTER TABLE student CHANGE class_id gr_id INT NOT NULL');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33B5062875 FOREIGN KEY (gr_id) REFERENCES `group` (id)');
        $this->addSql('CREATE INDEX IDX_B723AF33B5062875 ON student (gr_id)');
        $this->addSql('ALTER TABLE submission CHANGE std_id std_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33B5062875');
        $this->addSql('DROP INDEX IDX_B723AF33B5062875 ON student');
        $this->addSql('ALTER TABLE student CHANGE gr_id class_id INT NOT NULL');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33EA000B10 FOREIGN KEY (class_id) REFERENCES `group` (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_B723AF33EA000B10 ON student (class_id)');
        $this->addSql('ALTER TABLE submission CHANGE std_id std_id INT NOT NULL');
    }
}
