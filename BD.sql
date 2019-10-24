Create DATABASE if not Exists cou_project character set = 'utf8';

use cou_project;

create table if not exists utilisateur (
	idutil smallint not null,
	nomutil varchar(20) not null,
	prenomutil varchar(20) not null,
	pseudoutil varchar(20) not null,
	adminutil boolean not null,
	emailutil varchar(50) not null,
	passwordutil varchar(50) not null,
	primary key(idutil)
);

create table if not exists lieu (
	idlieu smallint not null,
	nomlieu varchar(50) not null,
	typelieu varchar(50) not null,
	ruelieu varchar(50) not null,
	numerolieu int not null,
	villelieu varchar(50) not null,
	descriptionlieu varchar(200) not null,
	primary key(idlieu)
);

create table if not exists avis (
	idavis smallint not null,
	noteavis int not null,
	commentaire varchar(200) not null,
	primary key(idavis)
);

create table if not exists adresse (
	ville varchar(50) not null,
	rue varchar(50) not null,
	num int not null,
	codepost int not null,
	idlieu smallint not null,
	primary key(ville,rue,idlieu),
	key(idlieu)
);

create table if not exists favoris(
	idutil smallint not null,
	idlieu smallint not null,
	primary key(idutil, idlieu),
	key(idutil),
	key(idlieu)
);

create table if not exists avisposte(
	idutil smallint not null,
	idlieu smallint not null,
	idavis smallint not null,
	primary key(idutil, idlieu, idavis)
	key(idutil),
	key(idlieu),
	key(idavis)
);

ALTER table adresse add constraint fkadressealieu FOREIGN key (idlieu) REFERENCES lieu(idlieu);

ALTER table favoris add constraint fkfavorisutil FOREIGN key (idutil) REFERENCES utilisateur(idutil);
ALTER table favoris add constraint fkfavorislieu FOREIGN key (idlieu) REFERENCES lieu(idlieu);

ALTER table avisposte add constraint fkavisposteutil FOREIGN key (idutil) REFERENCES utilisateur(idutil);
ALTER table avisposte add constraint fkavispostelieu FOREIGN key (idlieu) REFERENCES lieu(idlieu);
ALTER table avisposte add constraint fkavisposteavis FOREIGN key (idavis) REFERENCES avis(idavis);
