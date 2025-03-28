import plan from "../models/plans.model.js"

export const createplan = async (req, res) => {
    try {
        const { name, type, description, status, price, rating, startDate, endDate, image } = req.body

        if (!name || !type || !description || !status || !price || !rating || !startDate || !endDate || !image) {

            res.status(401).json({ message: "all field is reqoured" })

        }
        const Registerplan = new plan({
            name,
            type,
            description,
            status,
            price,
            rating,
            startDate,
            endDate,
            image
        });
        await Registerplan.save()
        res.status(200).json({ message: "Plan Registration succesfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}


export const getplan = async (req, res) => {
    try {
        const plans = await plan.find()
        if (!plans) {

            res.status(400).json({ message: "palns not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "internal server error" })
    }
}

export const updateplan = async (req, res) => {
    try {
        const updateplan = await plan.findById(req.params.id)

        if (!updateplan) res.status(400).json({ message: "Plans not found" })
        const { name, type, description, status, price, rating, startDate, endDate, image } = req.body
        if (name) updateplan.name = name
        if (type) updateplan.type = type
        if (description) updateplan.description = description
        if (status) updateplan.status = status
        if (price) updateplan.price = price
        if (rating) updateplan.rating = rating
        if (startDate) updateplan.startDate = startDate
        if (endDate) updateplan.endDate = endDate
        if (image) updateplan.image = image

        await updateplan.save()
        res.status(200).json({ message: " Plan Updeted Succesfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const Deleteplan = async ( req , res)=>{
    try {

        const deleteplan = await plan.findByIdAndDelete(req.params.id)

        if(!deleteplan)res.status(401).json({message:"Plan Not Found!"})

         res.status(200).json({message:"Plan Deleted succesfully!"})           
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Serever Error"})
    }
}