Create DATABASE if not Exists cou_project character set = 'utf8';

use cou_project;

create table if not exists utilisateur (
	id smallint not null auto_increment,
	nom varchar(20) not null,
	prenom varchar(20) not null,
	pseudo varchar(20) not null,
	type varchar(1) not null default 'U',
	email varchar(50) not null,
	hashpwd password not null,
	idadr smallint not null,
	primary key(id),
	key(idadr)
)engine=innodb;

create table if not exists lieu (
	id smallint not null auto_increment,
	nom varchar(50) not null,
	type varchar(50) not null,
	description varchar(MAX) not null,
	idadr smallint not null,
	primary key(id),
	key(idadr)
)engine=innodb;


create table if not exists adresse (
	id smallint not null auto_increment,
	ville varchar(50) not null,
	rue varchar(50) not null,
	num int not null,
	cp int not null,
	primary key(id),
)engine=innodb;

create table if not exists favoris(
	idutil smallint not null,
	idlieu smallint not null,
	primary key(idutil, idlieu),
	key(idlieu)
)engine=innodb;

create table if not exists avis(
	id smallint not null auto_increment,
	note float not null,
	commentaire varchar(MAX),
	valider boolean not null,
	idutil smallint not null,
	idlieu smallint not null,
	primary key(id),
	key(idutil),
	key(idlieu)
)engine=innodb;


ALTER table favoris add constraint fkfavorisutil FOREIGN key (idutil) REFERENCES utilisateur(id);
ALTER table favoris add constraint fkfavorislieu FOREIGN key (idlieu) REFERENCES lieu(id);

ALTER table avis add constraint fkavisposteutil FOREIGN key (idutil) REFERENCES utilisateur(id);
ALTER table avis add constraint fkavispostelieu FOREIGN key (idlieu) REFERENCES lieu(id);

ALTER TABLE utilisateur add constraint fkutilisateuradresse FOREIGN KEY (idadr) REFERENCES adresse(id);

ALTER TABLE lieu add constraint fklieuutilisateur FOREIGN KEY (idadr) REFERENCES adresse(id);