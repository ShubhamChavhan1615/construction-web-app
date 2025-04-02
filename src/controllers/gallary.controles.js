import galleryModel from "../models/gallery.model.js"


export const Creategallery = async (req, res) => {
    try {
        const { image ,description } = req.body;
  
        if (!image || !description) {
            return res.status(400).json({ msg: "Field is required" }); // Ensure the function stops here
        }

        const insertimage = new galleryModel({
           image,
           description
        });

        await insertimage.save();
        res.status(200).json({ message: "Gallery Image Uploaded Successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


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