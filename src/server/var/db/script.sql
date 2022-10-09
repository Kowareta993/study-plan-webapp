DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS "incompatibles";
CREATE TABLE "courses" (
	"code"	TEXT,
	"name"	TEXT NOT NULL,
	"credits"	INTEGER NOT NULL,
	"max_students"	INTEGER,
	"preparatory"	TEXT,
	PRIMARY KEY("code")
);
CREATE TABLE "incompatibles" (
	"course1"	TEXT NOT NULL,
	"course2"	TEXT NOT NULL,
	FOREIGN KEY("course1") REFERENCES "courses"("code"),
	FOREIGN KEY("course2") REFERENCES "courses"("code")
);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("02GOLOV", "Architetture dei sistemi di elaborazione", 12, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("02LSEOV", "Computer architectures", 12, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01SQJOV", "Data Science and Database Technology", 8, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01SQMOV", "Data Science e Tecnologie per le Basi di Dati", 8, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01SQLOV", "Database systems", 8, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01OTWOV", "Computer network technologies and services", 6, 3, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("02KPNOV", "Tecnologie e servizi di rete", 6, 3, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01TYMOV", "Information systems security services", 12, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01UDUOV", "Sicurezza dei sistemi informativi", 12, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("05BIDOV", "Ingegneria del software", 6, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("04GSPOV", "Software engineering", 6, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01UDFOV", "Applicazioni Web I", 6, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01TXYOV", "Web Applications I", 6, 3, "02GOLOV");
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01TXSOV", "Web Applications I", 6, NULL, "02LSEOV");
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("02GRSOV", "Programmazione di sistema", 6, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01NYHOV", "System and device programming", 6, 3, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01SQOOV", "Reti Locali e Data Cente", 6, NULL, "01TXYOV");
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01TYDOV", "Software networkin", 7, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("03UEWOV", "Challeng", 5, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01URROV", "Computational intelligenc", 6, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01OUZPD", "Model based software desig", 4, NULL, NULL);
INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES ("01URSPD", "Internet Video Streamin", 6, 2, NULL);

INSERT INTO incompatibles (course1, course2) VALUES ("02GOLOV", "02LSEOV");
INSERT INTO incompatibles (course1, course2) VALUES ("02LSEOV", "02GOLOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01SQJOV", "01SQMOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01SQJOV", "01SQLOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01SQMOV", "01SQJOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01SQMOV", "01SQLOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01SQLOV", "01SQJOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01SQLOV", "01SQMOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01OTWOV", "02KPNOV");
INSERT INTO incompatibles (course1, course2) VALUES ("02KPNOV", "01OTWOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01TYMOV", "01UDUOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01UDUOV", "01TYMOV");
INSERT INTO incompatibles (course1, course2) VALUES ("05BIDOV", "04GSPOV");
INSERT INTO incompatibles (course1, course2) VALUES ("04GSPOV", "05BIDOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01UDFOV", "01TXYOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01TXYOV", "01UDFOV");
INSERT INTO incompatibles (course1, course2) VALUES ("02GRSOV", "01NYHOV");
INSERT INTO incompatibles (course1, course2) VALUES ("01NYHOV", "02GRSOV");












































