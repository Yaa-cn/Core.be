import { Router } from "express"
import Review from "../models/review.js"

const router = Router()

router.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/reviews/:id", async (req, res) => {
    try {
        const { id } = req.params

        const review = await Review.findById(id)
        if (!review) {
            return res.status(404).json({ message: "Review not found !" })
        }
        res.status(200).json(review)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post("/reviews", async (req, res) => {
    try {
        const review = new Review(req.body)
        await review.save()
        res.status(201).json(review)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch("/reviews/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { returnDocument: "after" }
        )

        if (!review) {
            return res.status(404).json({ message: "Review not found !" })
        }

        res.status(200).json(review)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/reviews/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(
            req.params.id
        )

        if (!review) {
            return res.status(404).json({ message: "Review not found !" })
        }

        res.status(200).json({ message: "Review deleted successfully" }, review)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router