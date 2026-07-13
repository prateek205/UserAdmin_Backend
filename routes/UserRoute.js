import express from 'express'
import { deleteEmployee, getEmployee, postEmployee, updateEmployee } from '../controllers/UserController.js'

const router = express.Router()

router.post("/createEmployee", postEmployee)
router.get("/getEmployee",getEmployee)
router.put("/updateEmployee/:id", updateEmployee)
router.delete("/deleteEmployee/:id",deleteEmployee)

export default router