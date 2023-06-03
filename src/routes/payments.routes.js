import { Router } from 'express'
import {cancelPayment, captureOrder, createOrder, } from '../controllers/payment.controller.js'

const router = Router()

router.post('/create-order', createOrder)

router.get('/capture-order', captureOrder)

router.get('/cancel-payment', cancelPayment)

export default router;