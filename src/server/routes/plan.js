var express = require('express');
var db = require('../database.js');
var router = express.Router();

/* plan router
    GET: fetch the user study plan from database
    PUT: update the user study plan structure in database
    POST: create an empty study plan for user
    DELETE: remove user study plan from database
*/

router.get('/', (req, res, next) => {
    if (!req.user) {
        return res.status(400).json({
            success: false,
            msg: "login first!"
        })
    }
    let sql = "select plan_id, type from users left join plans on plans.user_id=users.id where username = ?"
    db.get(sql, [req.user], (err, row) => {
        if (err) {
            return res.status(400).json({
                success: false,
                msg: err.message
            })
        }
        if (!row.plan_id) {
            return res.json({
                success: true,
                plan: null
            })
        }
        let type = row.type
        let sql = "select code, name, credits from plan_courses left join courses on courses.code=plan_courses.course_id where plan_id = ?"
        db.all(sql, [row.plan_id], (err, rows) => {
            let courses = []
            let total = 0
            rows.forEach(row => {
                courses.push({
                    code: row.code,
                    name: row.name,
                    credits: row.credits
                })
                total += row.credits
            })
            return res.json({
                success: true,
                plan: {
                    id: row.plan_id,
                    courses: courses,
                    type: type,
                    total: total,
                    max: type == "full-time" ? 80 : 40
                }
            })
        })

    })
});

router.post('/', (req, res, next) => {

    if (!req.user) {
        return res.status(400).json({
            success: false,
            msg: "login first!"
        })
    }

    let sql = "select id from users where username = ?"
    db.get(sql, [req.user], (err, row) => {
        if (err) {
            return res.status(400).json({
                success: false,
                msg: err.message
            })
        }
        let user_id = row.id
        console.log(user_id)
        db.run("insert into plans (type, user_id) VALUES (?, ?)", [req.body.option, user_id], (err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err.message
                })
            }
            return res.json({
                success: true
            })
        })

    })

});

router.delete('/', (req, res, next) => {

    if (!req.user) {
        return res.status(400).json({
            success: false,
            msg: "login first!"
        })
    }
    let sql = "select id from users where username = ?"
    db.get(sql, [req.user], (err, row) => {

        if (err) {
            return res.status(400).json({
                success: false,
                msg: err.message
            })
        }
        let user_id = row.id
        db.run("delete from plans where user_id = ?", [user_id], (err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err.message
                })
            }
            return res.json({
                success: true
            })
        })

    })

});

router.put('/', (req, res, next) => {
    let plan = req.body.plan
    if (!req.user) {
        return res.status(400).json({
            success: false,
            msg: "login first!"
        })
    }
    let sql = "select plan_id from users where username = ?"
    db.get(sql, [req.user], (err, row) => {
        if (err) {
            return res.status(400).json({
                success: false,
                msg: err.message
            })
        }
        let plan_id = row.plan_id
        db.run("delete from plan_courses where plan_id = ?", [plan_id], (err) => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err.message
                })
            }
            let insert = "insert into plan_courses (plan_id, course_id) VALUES (?, ?)"
            plan.courses.forEach(course => {
                db.run(insert, [plan_id, course.code])
            });
            return res.json({
                success: true
            })
        })

    })

});

module.exports = router;