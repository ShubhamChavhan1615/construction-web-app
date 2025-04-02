import projectModel from "../models/project.model.js"

export const createProject = async (req, res) => {
    try {
        const { title ,completionDate , description ,image } = req.body
        
        if (!title ||!completionDate ||! description || !image) {
            res.status(401).json({ message: "all field is reqoured" })
        }
       const Project =new projectModel({
        title ,completionDate , description ,image 
       })
       await Project.save() 
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
        const { completionDate, title, description, image } = req.body
        if (title) updateProject.title = title
        if (completionDate) updateProject.completionDate = completionDate
        if (description) updateProject.description = description
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