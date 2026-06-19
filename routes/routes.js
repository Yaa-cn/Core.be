import { Router } from "express"
import productRoutes from "./productRoutes.js"
import userRoutes from "./userRoutes.js"
import addressRoutes from "./addressRoutes.js"
import reviewRoutes from "./reviewRoutes.js"
import cartRoutes from "./cartRoutes.js"
import wishlistRoutes from "./wishlistRoutes.js"
import authRoutes from "./authRoutes.js"
import profileRoutes from "./profileRoutes.js"

const router = Router()

router.use(productRoutes)
router.use(userRoutes)
router.use(addressRoutes)
router.use(reviewRoutes)
router.use(cartRoutes)
router.use(wishlistRoutes)
router.use(authRoutes)
router.use(profileRoutes)

export default router