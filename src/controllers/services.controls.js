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