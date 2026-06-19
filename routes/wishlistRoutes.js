import { Router } from "express"
import Wishlist from "../models/wishlist.js"

const router = Router()

router.get("/wishlistItems", async (req, res) => {
    try {
        const cartItems = await WishlistItem.find()
        res.status(200).json(cartItems)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/wishlistItems/:id", async (req, res) => {
    try {
        const { id } = req.params

        const wishlistItem = await WishlistItem.findById(id)
        if (!wishlistItem) {
            return res.status(404).json({ message: "Item not found !" })
        }
        res.status(200).json(wishlistItem)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post("/wishlistItems", async (req, res) => {
    try {
        const wishlistItem = new WishlistItem(req.body)
        await wishlistItem.save()
        res.status(200).json(wishlistItem)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch("/wishlistItems/:id", async (req, res) => {
    try {
        const wishlistItem = await WishlistItem.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { returnDocument: "after" }
        )

        if (!wishlistItem) {
            return res.status(404).json({ message: "Item not found !" })
        }

        res.status(200).json(wishlistItem)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/wishlistItems/:id", async (req, res) => {
    try {
        const wishlistItem = await WishlistItem.findByIdAndDelete(
            req.params.id
        )

        if (!wishlistItem) {
            return res.status(404).json({ message: "Item not found !" })
        }

        res.status(200).json({ message: "WishlistItem deleted successfully" }, wishlistItem)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router