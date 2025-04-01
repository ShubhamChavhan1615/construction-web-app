import projectModel from "../models/project.model.js"

export const createProject = async (req, res) => {
    try {
        const { name, type, description, price } = req.body
        const projecteimages = req.files
        if (!name || !type || !description || !price) {
            res.status(401).json({ message: "all field is reqoured" })
        }

        if (!projecteimages || projecteimages.length === 0) {
            return res.status(401).json({ message: "At least one file is required!" });
        }

        let uploadedImages = [];

        // Upload each file to Cloudinary
        for (let file of projecteimages) {
            const result = await cloudinary.uploader.upload(file.path);
            uploadedImages.push(result.secure_url);
        }

        const Registerproject = new projectModel({
            name,
            type,
            description,
            price,
            image: uploadedImages
        });
        await Registerproject.save()

        res.status(200).json({ message: "Project Registration succesfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

export const getproject = async (req, res) => {
    try {
        const project = await projectModel.find()
        if (!project) {
            res.status(400).json({ message: "project not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: "internal server error" })
    }
}

export const updateProject = async (req, res) => {
    try {
        const updateProject = await projectModel.findById(req.params.id)

        if (!updateProject) res.status(400).json({ message: "Plans not found" })
        const { name, type, description, price, image } = req.body
        if (name) updateProject.name = name
        if (type) updateProject.type = type
        if (description) updateProject.description = description
        if (price) updateProject.price = price
        if (image) updateProject.image = image

        await updateProject.save()

        res.status(200).json({ message: " Project Updeted Succesfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteproject = async (req, res) => {
    try {

        const deleteproject = await projectModel.findByIdAndDelete(req.params.id)

        if (!deleteproject) res.status(401).json({ message: "project Not Found!" })

        res.status(200).json({ message: "Project Deleted succesfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Serever Error" })
    }
}