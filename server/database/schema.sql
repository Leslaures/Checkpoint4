create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

CREATE TABLE aliment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_aliment VARCHAR(255) NOT NULL,
  categorie_aliment VARCHAR(255) NOT NULL,
  portion_standard INT,
  empreinte_carbone DECIMAL(10, 2),
  consommation_eau DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

