import { Router } from "express"
import Cart from "../models/cart.js"
import { auth } from "../middleware/auth.js"

const router = Router()

router.get("/cart", auth, async (req, res) => {
    try {
        const user = req.session.userId

        const cart = await Cart.findOne({ user }).populate("items.product")

        if (!cart) {
            cart = new Cart({ user, items: [] });
        }

        res.status(200).json(cart)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post("/cart/merge", auth, async (req, res) => {
    try {
        const { cartItems } = req.body
        const user = req.session.userId

        let cart = await Cart.findOne({ user })

        if (!cart) {
            cart = new Cart({ user, items: [] });
        }

        cartItems.forEach(newItem => {
            const existingItem = cart.items.find(item =>
                item.product.equals(newItem.product._id)
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity
            } else {
                cart.items.push({ product: newItem.product._id, quantity: newItem.quantity })
            }
        })

        await cart.save();
        return res.status(cart.isNew ? 201 : 200).json({
            message: cart.isNew ? "Cart created and merged successfully!" : "Cart merged successfully!",
            cart
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.post("/cart", auth, async (req, res) => {
    try {
        const { product, quantity } = req.body

        const user = req.session.userId

        let cart = await Cart.findOne({ user })

        if (!cart) {
            cart = new Cart({ user, items: [] })
            await cart.save()
        }

        const existProduct = cart.items.some(item => item.product.equals(product._id))

        if (existProduct) {
            return res.status(409).json({ message: "Item already in cart !" })
        }

        cart.items.push({ product, quantity })
        await cart.save()
        res.status(201).json({ message: "Item added to cart !", cart })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch("/cart/:product", auth, async (req, res) => {
    try {
        const { product } = req.params
        const { action } = req.body

        const user = req.session.userId

        let cart = await Cart.findOne({ user })

        let updateQuery

        if (action === "dec") {
            updateQuery = { $inc: { "items.$.quantity": -1 } }
        }

        if (action === "inc") {
            updateQuery = { $inc: { "items.$.quantity": 1 } }
        }

        cart = await Cart.findOneAndUpdate(
            { user, "items.product": product },
            updateQuery,
            { returnDocument: "after" }
        )

        res.status(200).json(cart)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete("/cart/:product", auth, async (req, res) => {
    try {
        const { product } = req.params

        const user = req.session.userId

        let cart = await Cart.findOne({ user })

        cart.items = cart.items.filter(item => !item.product.equals(product))
        await cart.save()
        res.status(200).json({ message: "Product removed from cart successfully !", cart })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router