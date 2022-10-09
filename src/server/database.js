var sqlite3 = require('sqlite3').verbose()
var crypto = require('crypto');

/* wrapper around sqlite3 handler for initializing database tables and synchronizing requests (with Promises) */

const DBSOURCE = "./var/db/database.sqlite"

var db;
exports.db = db

exports.open = function () {
    return new Promise(function (resolve, reject) {
        this.db = new sqlite3.Database(DBSOURCE, (err) => {
            if (err) {
                throw err
            } else {
                console.log('Connected to the SQLite database.');
            }
            resolve();
        });

    });
}



exports.close = function () {
    return new Promise(function (resolve, reject) {
        this.db.close();
        resolve();
    });
}

exports.run = function (query, params, action) {
    return new Promise(function (resolve, reject) {
        this.db.run(query, params, (err, result) => {
            if (action != undefined)
                action(err, result);
            resolve();
        });
    });
}

exports.get = function (query, params, action) {
    return new Promise(function (resolve, reject) {
        this.db.get(query, params, (err, row) => {
            if (action != undefined)
                action(err, row);
            resolve();
        });
    });
}

exports.all = function (query, params, action) {
    return new Promise(function (resolve, reject) {
        this.db.all(query, params, (err, rows) => {
            action(err, rows);
            resolve();
        });
    });
}




exports.init = function () {
    return new Promise(function (resolve, reject) {
        this.db.run(
            `CREATE TABLE "users" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "username" TEXT UNIQUE,
                "hashed_password" BLOB,
                "salt" BLOB,
                "plan_id" INTEGER UNIQUE,
                FOREIGN KEY("plan_id") REFERENCES plans("id")
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var salt = crypto.randomBytes(16);
                    this.db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                        'student1',
                        crypto.pbkdf2Sync('pass1', salt, 310000, 32, 'sha256'),
                        salt
                    ]);
                    this.db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                        'student2',
                        crypto.pbkdf2Sync('pass2', salt, 310000, 32, 'sha256'),
                        salt
                    ]);
                    this.db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                        'student3',
                        crypto.pbkdf2Sync('pass3', salt, 310000, 32, 'sha256'),
                        salt
                    ]);
                    this.db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                        'student4',
                        crypto.pbkdf2Sync('pass4', salt, 310000, 32, 'sha256'),
                        salt
                    ]);
                    this.db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                        'student5',
                        crypto.pbkdf2Sync('pass5', salt, 310000, 32, 'sha256'),
                        salt
                    ]);
                }
            });
            
        this.db.run(
            `CREATE TABLE "plans" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "type" TEXT,
                "user_id" INTEGER NOT NULL UNIQUE,
                FOREIGN KEY("user_id") REFERENCES users("id")
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    this.db.run(
                        `CREATE TRIGGER set_user_plan AFTER INSERT ON plans
                        BEGIN
                            UPDATE users SET plan_id = NEW.id WHERE id = NEW.user_id;
                        END;`
                    , () => {
                        var insert = 'INSERT INTO plans (type, user_id) VALUES (?, ?)'
                        this.db.run(insert, ["half-time", 1]);
                        this.db.run(insert, ["full-time", 2]);
                        this.db.run(insert, ["half-time", 3]);
                    })
                    this.db.run(
                        `CREATE TRIGGER del_user_plan AFTER DELETE ON plans
                        BEGIN
                            UPDATE users SET plan_id = null WHERE id = OLD.user_id;
                            DELETE FROM plan_courses WHERE plan_id = OLD.id;
                        END;`
                    )
                }
            });
        this.db.run(
            `CREATE TABLE "courses" (
                "code"	TEXT,
                "name"	TEXT NOT null,
                "credits"	INTEGER NOT null,
                "max_students"	INTEGER,
                "preparatory"	TEXT,
                PRIMARY KEY("code")
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO courses (code, name, credits, max_students, preparatory) VALUES (?, ?, ?, ?, ?)'
                    this.db.run(insert, ["02GOLOV", "Architetture dei sistemi di elaborazione", 12, null, null]);
                    this.db.run(insert, ["02LSEOV", "Computer architectures", 12, null, null]);
                    this.db.run(insert, ["01SQJOV", "Data Science and Database Technology", 8, null, null]);
                    this.db.run(insert, ["01SQMOV", "Data Science e Tecnologie per le Basi di Dati", 8, null, null]);
                    this.db.run(insert, ["01SQLOV", "Database systems", 8, null, null]);
                    this.db.run(insert, ["01OTWOV", "Computer network technologies and services", 6, 3, null]);
                    this.db.run(insert, ["02KPNOV", "Tecnologie e servizi di rete", 6, 3, null]);
                    this.db.run(insert, ["01TYMOV", "Information systems security services", 12, null, null]);
                    this.db.run(insert, ["01UDUOV", "Sicurezza dei sistemi informativi", 12, null, null]);
                    this.db.run(insert, ["05BIDOV", "Ingegneria del software", 6, null, null]);
                    this.db.run(insert, ["04GSPOV", "Software engineering", 6, null, null]);
                    this.db.run(insert, ["01UDFOV", "Applicazioni Web I", 6, null, null]);
                    this.db.run(insert, ["01TXYOV", "Web Applications I", 6, 3, "02GOLOV"]);
                    this.db.run(insert, ["01TXSOV", "Web Applications I", 6, null, "02LSEOV"]);
                    this.db.run(insert, ["02GRSOV", "Programmazione di sistema", 6, null, null]);
                    this.db.run(insert, ["01NYHOV", "System and device programming", 6, 3, null]);
                    this.db.run(insert, ["01SQOOV", "Reti Locali e Data Cente", 6, null, "01TXYOV"]);
                    this.db.run(insert, ["01TYDOV", "Software networkin", 7, null, null]);
                    this.db.run(insert, ["03UEWOV", "Challeng", 5, null, null]);
                    this.db.run(insert, ["01URROV", "Computational intelligenc", 6, null, null]);
                    this.db.run(insert, ["01OUZPD", "Model based software desig", 4, null, null]);
                    this.db.run(insert, ["01URSPD", "Internet Video Streamin", 6, 2, null]);
                }
            });
        this.db.run(
            `CREATE TABLE "incompatibles" (
                "course1"	TEXT NOT null,
                "course2"	TEXT NOT null,
                FOREIGN KEY("course1") REFERENCES "courses"("code"),
                FOREIGN KEY("course2") REFERENCES "courses"("code")
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO incompatibles (course1, course2) VALUES (?, ?)'
                    this.db.run(insert, ["02GOLOV", "02LSEOV"]);
                    this.db.run(insert, ["02LSEOV", "02GOLOV"]);
                    this.db.run(insert, ["01SQJOV", "01SQMOV"]);
                    this.db.run(insert, ["01SQJOV", "01SQLOV"]);
                    this.db.run(insert, ["01SQMOV", "01SQJOV"]);
                    this.db.run(insert, ["01SQMOV", "01SQLOV"]);
                    this.db.run(insert, ["01SQLOV", "01SQJOV"]);
                    this.db.run(insert, ["01SQLOV", "01SQMOV"]);
                    this.db.run(insert, ["01OTWOV", "02KPNOV"]);
                    this.db.run(insert, ["02KPNOV", "01OTWOV"]);
                    this.db.run(insert, ["01TYMOV", "01UDUOV"]);
                    this.db.run(insert, ["01UDUOV", "01TYMOV"]);
                    this.db.run(insert, ["05BIDOV", "04GSPOV"]);
                    this.db.run(insert, ["04GSPOV", "05BIDOV"]);
                    this.db.run(insert, ["01UDFOV", "01TXYOV"]);
                    this.db.run(insert, ["01TXYOV", "01UDFOV"]);
                    this.db.run(insert, ["02GRSOV", "01NYHOV"]);
                    this.db.run(insert, ["01NYHOV", "02GRSOV"]);
                }
            });
            this.db.run(
                `CREATE TABLE "plan_courses" (
                    "plan_id" INTEGER NOT NULL,
                    "course_id" TEXT NOT NULL,
                    FOREIGN KEY("plan_id") REFERENCES plans("id"),
                    FOREIGN KEY("course_id") REFERENCES course("code")
                )`,
                (err) => {
                    if (err) {
                        // Table already created
                    } else {
                        // Table just created, creating some rows
                        var insert = 'INSERT INTO plan_courses (plan_id, course_id) VALUES (?, ?)'
                        this.db.run(insert, [1, "01URSPD"]);
                        this.db.run(insert, [1, "01OUZPD"]);
                        this.db.run(insert, [1, "01URROV"]);
                        this.db.run(insert, [1, "03UEWOV"]);
                        this.db.run(insert, [1, "01NYHOV"]);
                        this.db.run(insert, [2, "01URSPD"]);
                        this.db.run(insert, [2, "01OUZPD"]);
                        this.db.run(insert, [2, "01URROV"]);
                        this.db.run(insert, [2, "03UEWOV"]);
                        this.db.run(insert, [2, "01NYHOV"]);
                        this.db.run(insert, [2, "01TYDOV"]);
                        this.db.run(insert, [2, "01SQOOV"]);
                        this.db.run(insert, [3, "01NYHOV"]);
                        this.db.run(insert, [3, "01OUZPD"]);
                        this.db.run(insert, [3, "01URROV"]);
                        this.db.run(insert, [3, "03UEWOV"]);

                    }
                });
        resolve();
    });
}