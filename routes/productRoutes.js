import { Router } from "express"
import Product from "../models/product.js"

const router = Router()

router.get("/products", async (req, res) => {
    try {
        const { slug } = req.query
        if (slug) {

            const product = await Product.findOne({ slug })

            if (!product) {
                return res.status(404).json({ message: "Product not found !" })
            }
            return res.status(200).json(product)
        }

        const products = await Product.find()
        res.status(200).json(products)

    } catch (err) {
        res.status(500).json({ message: "Unable to fetch data !" })
    }
})

router.get("/products/:slug", async (req, res) => {
    try {
        const { slug } = req.params
        const product = await Product.findOne({ slug })
        if (!product) {
            return res.status(404).json({ message: "Product not found !" })
        }
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: "Unable to fetch data !" })
    }
})

router.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { returnDocument: "after" }
        )

        if (!product) {
            return res.status(404).json({ message: "Product not found !" })
        }

        res.status(200).json(product)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        )

        if (!product) {
            return res.status(404).json({ message: "Product not found !" })
        }

        res.status(200).json({ message: "Product deleted successfully" }, product)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router