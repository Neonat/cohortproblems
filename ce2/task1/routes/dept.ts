import express, { Router, Request, Response, NextFunction } from 'express';
import * as deptmodel from '../models/dept';
import * as staffmodel from '../models/staff';

const router: Router = express.Router();

router.get('/add/:code', async function(req: Request, res: Response, next: NextFunction) {
    //res.send(`TODO`); // TODO: Fixme
    const dept = new deptmodel.Dept(req.params.code);
    await deptmodel.insertMany([dept]);
    res.json({ code: dept.code });
});

/* GET dept listing. */

router.get('/all/withstaff/', async function(req: Request, res: Response, next: NextFunction) {
    //res.send(`TODO`); // TODO: Fixme
    const depts = await deptmodel.all();
    const staffs = await staffmodel.all();
    const result = depts.map(d => ({
        code: d.code,
        staffs: staffs.filter(s => s.dept === d.code)
    }));
    res.json(result);
})
// Placed above /all/ to avoid conflict with the route /all/ which is defined below
// Express matches routes in order, so if /all/ is defined before /all/withstaff/, 
// then the request to /all/withstaff/ will be handled by the /all/ route, 
// which is not what we want.

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    //res.send(`TODO`); // TODO: Fixme
    const depts = await deptmodel.all();
    res.json(depts);
});

export default router;