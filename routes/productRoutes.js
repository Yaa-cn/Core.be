import { Router } from "express"
import Product from "../models/product.js"

const router = Router()

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send({ message: "Unable to fetch data" })
    }
})

export default router