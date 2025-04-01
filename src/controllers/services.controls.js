import { Service } from "../models/services.js";

export const createService = async (req, res) => {
    const { title, description, icon, link } = req.body;
    try {
        const newService = new Service({
            title,
            description,
            icon,
            link,
        });
        await newService.save();
        res.status(201).redirect("/Admin");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const editService = async (req, res) => {
    const { id } = req.params;
    const dataToUpdate = req.body;
    try {
        const updatedService = await Service.findByIdAndUpdate(id, dataToUpdate, { new: true });
        if (!updatedService) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteService = async (req, res) => {
    const  id  = req.params.id;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}