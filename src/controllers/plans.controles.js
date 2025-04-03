// import plan from "../models/plans.model.js"

// export const createplan = async (req, res) => {
//     try {
//         const { name, type, description, status, price, rating, startDate, endDate, image } = req.body
//         const planseimages = req.files
//         if (!name || !type || !description || !status || !price || !rating || !startDate || !endDate || !image) {
//             res.status(401).json({ message: "all field is reqoured" })
//         }

//         if (!planseimages || planseimages.length === 0) {
//             return res.status(401).json({ message: "At least one file is required!" });
//         }

//         let uploadedImages = [];

//         // Upload each file to Cloudinary
//         for (let file of planseimages) {
//             const result = await cloudinary.uploader.upload(file.path);
//             uploadedImages.push(result.secure_url);
//         }

//         const Registerplan = new plan({
//             name,
//             type,
//             description,
//             status,
//             price,
//             rating,
//             startDate,
//             endDate,
//             image: uploadedImages
//         });
//         await Registerplan.save()

//         res.status(200).json({ message: "Plan Registration succesfully!" })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "internal server error" })
//     }
// }

// export const getplan = async (req, res) => {
//     try {
//         const plans = await plan.find()
//         if (!plans) {

//             res.status(400).json({ message: "palns not found" })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ massage: "internal server error" })
//     }
// }

// export const updateplan = async (req, res) => {
//     try {
//         const updateplan = await plan.findById(req.params.id)

//         if (!updateplan) res.status(400).json({ message: "Plans not found" })
//         const { name, type, description, status, price, rating, startDate, endDate, image } = req.body
//         if (name) updateplan.name = name
//         if (type) updateplan.type = type
//         if (description) updateplan.description = description
//         if (status) updateplan.status = status
//         if (price) updateplan.price = price
//         if (rating) updateplan.rating = rating
//         if (startDate) updateplan.startDate = startDate
//         if (endDate) updateplan.endDate = endDate
//         if (image) updateplan.image = image

//         await updateplan.save()
//         res.status(200).json({ message: " Plan Updeted Succesfully" })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

// export const Deleteplan = async (req, res) => {
//     try {

//         const deleteplan = await plan.findByIdAndDelete(req.params.id)

//         if (!deleteplan) res.status(401).json({ message: "Plan Not Found!" })

//         res.status(200).json({ message: "Plan Deleted succesfully!" })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Internal Serever Error" })
//     }
// }
import express from "express"
import Plan from "../models/plans.model.js" // Ensure the correct path
const router = express.Router();

// Create a new plan
// export const createplan = async (req, res) => {
//     try {
//         const { name, description, price, features, image, images } = req.body;
//         // if(!name || !description|| !price || !features  ||!image || !images)
//         // res.status(400).json({msg:"all field is reueird"})

//         const plan = new Plan({
//             name,
//             description,
//             price,
//             features: features.split(',').map(f => f.trim()), // Convert comma-separated features into an array
//             image, // Direct image URL
//             images: images.split(',').map(img => img.trim()) // Convert comma-separated URLs into an array
//         });

//         await plan.save();
//         res.status(200).json({msg:"success"})
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// };
export const createplan = async (req, res) => {
    try {
        const { name, description, price, features, image, images } = req.body;

        // Validate if essential fields are provided
        if (!name || !description || !price || !features || !image || !images) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Ensure features and images are strings before calling split
        const featuresArray = features && typeof features === 'string' ? features.split(',').map(f => f.trim()) : [];
        const imagesArray = images && typeof images === 'string' ? images.split(',').map(img => img.trim()) : [];

        // Create the plan object
        const plan = new Plan({
            name,
            description,
            price,
            features: featuresArray, // Converted to array
            image, // Direct image URL
            images: imagesArray // Converted to array
        });

        // Save the plan to the database
        await plan.save();

        // Return success response and redirect
        res.redirect('/admin');
       

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

// Update an existing plan
 export const updateplan = async (req, res) => {
    try {
        const { name, description, price, features, image, images } = req.body;

        await Plan.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            features: features.split(',').map(f => f.trim()),
            image,
            images: images.split(',').map(img => img.trim())
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Delete a plan
export const Deleteplan = async (req, res) => {
    try {
        await Plan.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export default router;
