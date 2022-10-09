var express = require('express');
var db = require('../database.js');
var router = express.Router();

/* courses router 
    GET: query database and return  courses as response
*/
router.get('/', (req, res, next) => {
    courses(req, res, next).then((result) => {
        if (!result.success) {
            return res.status(400).json(result)
        }
        return res.json(result)
    })
});

async function courses(req, res, next) {
    await db.open()
    var sql = "select * from courses order by name"
    let courses = [];
    await db.all(sql, [], (err, rows) => {
        if (err) {
            return {
                success: false,
                err: err.message
            }
        }
        rows.forEach(row => {
            var course = {}
            course["code"] = row["code"]
            course["name"] = row["name"]
            course["credits"] = row["credits"]
            course["capacity"] = row["max_students"]
            course["preparatory"] = row["preparatory"]
            course["incompatibles"] = []
            course["enrollment"] = 0
            courses.push(course)
        });
    });
    for (let i = 0; i < courses.length; i++) {
        var course = courses[i];
        let sql = "select course2 from incompatibles where course1 = ?";
        let params = [course["code"]];
        await db.all(sql, params, (err, rows) => {
            rows.forEach(row => {
                course["incompatibles"].push(row["course2"])
            });
        });
        sql = "select COUNT(*) as count  from plan_courses left join plans on plans.id=plan_courses.plan_id where course_id = ?";
        await db.get(sql, [course.code], (err, row) => {
            course['enrollment'] = row.count
        })
    }
    return {
        success: true,
        "courses": courses
    }
}

module.exports = router;