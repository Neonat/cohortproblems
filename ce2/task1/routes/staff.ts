import express, { Router, Request, Response, NextFunction } from 'express';
import * as staffmodel from '../models/staff';
import * as deptmodel from '../models/dept';

const router: Router = express.Router();

/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req: Request, res: Response, next: NextFunction) {
    //res.send(`TODO`); // TODO: Fixme
    const staff = new staffmodel.Staff(req.params.id, req.params.name, req.params.code);
    await staffmodel.insertMany([staff]);
    res.json({ id: staff.id, name: staff.name, dept: staff.dept });
});

/* GET staff listing. */

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    //res.send(`TODO`); // TODO: Fixme
    const staffs = await staffmodel.all();
    res.json(staffs);
});

export default router;