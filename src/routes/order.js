import {verifyToken} from '../middleware/auth.js'
import { confirmOrder, createOrder, getOrderById, getOrders, updateOrderStatus } from '../controllers/order/order.js'

export const orderRoutes = async (fastify,_) => {
    fastify.addHook("preHandler", async (req, res) => {
        const isAuthenticated = await verifyToken(req, res)
        if(!isAuthenticated){
            return res.code(401).send({message: 'Unauthorized'})
        }
    })

    fastify.post('/order', createOrder)
    fastify.get('/order', getOrders)
    fastify.patch('/order/:orderId/status', updateOrderStatus)
    fastify.post('/order/:orderId/confirm', confirmOrder)
    fastify.get('/order/:orderId', getOrderById)
}