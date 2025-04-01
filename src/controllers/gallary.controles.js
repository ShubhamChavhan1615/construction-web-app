import galleryModel from "../models/gallery.model.js"
import cloudinary from "../middleware/cloudinaryConfig.js";

export const Creategallery = async (req, res) => {
    try {
        const {imagallaryimage}= req.body
        if(!imagallaryimage){
           res.status(400).json({msg:"field is required"})
        }
        const insertimage = new galleryModel({
            imagallaryimage : imagallaryimage,
        })
        await insertimage.save()
        res.status(200).json({ message: "Gallary Image Upload Succesfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getGallary = async (req, res) => {
    try {
        const gallery = await galleryModel.find()
        res.status(200).json(gallery)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const Deletegallary = async (req, res) => {
    try {

        const deleteplan = await galleryModel.findByIdAndDelete(req.params.id)

        if (!deleteplan) res.status(401).json({ message: "Image Not Found!" })

        res.status(200).json({ message: "Image Deleted succesfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Serever Error" })
    }
}