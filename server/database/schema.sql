CREATE TABLE thematiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

-- Insertion des thématiques dans la table
INSERT INTO thematiques (id, name, slug) VALUES
(1, 'Numérique', 'numerique'),
(2, 'Alimentation', 'alimentation'),
(3, 'Boisson', 'boisson'),
(4, 'Transport', 'transport'),
(5, 'Habillement', 'habillement'),
(6, 'Électroménager', 'electromenager'),
(7, 'Mobilier', 'mobilier'),
(8, 'Chauffage', 'chauffage'),
(9, 'Fruits et légumes', 'fruitsetlegumes'),
(10, 'Usage numérique', 'usagenumerique'),
(13, 'Cas pratiques', 'caspratiques');

CREATE TABLE elements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    ecv DECIMAL(10,3) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(255) NOT NULL,
    thematique_id INT NOT NULL,
    Foreign Key (thematique_id) REFERENCES thematiques(id) ON DELETE CASCADE
);
