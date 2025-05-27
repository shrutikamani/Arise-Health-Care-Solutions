import express from 'express';
import 
{ 
addRemark, 
Appointment, 
exportAllUsersToExcel, 
getAllAppointments, 
updateStatus 
} from '../controllers/user.js';

const router = express.Router();

router.post('/person', Appointment);

router.get('/all-appointment', getAllAppointments);

router.post('/remark/:id', addRemark)

router.patch('/:id/status/:status', updateStatus)

// router.delete("/delete/:id", deleteUser);

router.get('/download-excel', exportAllUsersToExcel);

// router.get('/today-and-yesterday',TodayAndYesterdayAppointments)

export default router;