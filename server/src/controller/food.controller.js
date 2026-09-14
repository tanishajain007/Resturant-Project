import fileUploader from "../config/fileUploader.js";
import Food from "../models/food.model.js";

export const CreateFood = async (req, res) => {
    try {
        console.log("========== CREATE FOOD ==========");
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        console.log("=================================");

        const {
            name,
            discription,
            category,
            price,
            isavailable
        } = req.body;

        const files = req.files;

        // =========================
        // VALIDATION
        // =========================

        if (!name || !discription || !category || !price) {
            return res.status(400).json({
                success: false,
                message: "Kindly fill all required fields"
            });
        }

        // isavailable can be true OR false
        if (isavailable === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please select food availability"
            });
        }

        // =========================
        // CHECK IMAGES
        // =========================

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image"
            });
        }

        // =========================
        // UPLOAD IMAGES
        // =========================

        const result = await Promise.all(
            files.map(async (fileObj) => {

                console.log("Uploading:", fileObj.path);

                const value = await fileUploader(
                    fileObj.path,
                    "food_Image"
                );

                return value.secure_url;
            })
        );

        console.log("Uploaded Images:", result);

        // =========================
        // CREATE FOOD
        // =========================

        const newFood = new Food();

        newFood.name = name;
        newFood.discription = discription;
        newFood.category = category;
        newFood.price = price;

        // Convert string to boolean
        newFood.isavailable =
            isavailable === "true" || isavailable === true;

        newFood.images = result;

        await newFood.save();

        console.log("NEW FOOD:", newFood);

        return res.status(201).json({
            success: true,
            message: "Food Menu Created Successfully",
            newFoodItem: newFood
        });

    } catch (error) {

        console.error("CREATE FOOD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Error at Server"
        });
    }
};

export const UpdateFoodData = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;

        let UpdateFoodData = await Food.findOneAndUpdate(
            { _id: id },
            {
                ...data
            },
            {
                new: true,
            }
        )

        console.log(UpdateFoodData);

        return res.status(202).json({
            success: true,
            message: "Food Data updated successfully",
            data: UpdateFoodData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error at Server",
        })
    }
}

export const ReadAllData = async (req, res) => {
    try {
        // const Allfood = await Food.find({},"-images -discription");   // remove some field while fecthing data
        const Allfood = await Food.find({});

        if (!Allfood) {
            return res.status(404).json({
                success: false,
                message: "Resource not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food Data is Fetched Succesfully",
            data: Allfood,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error at Server",
        })
    }
}

export const GetOneData = async (req, res) => {
    try {
        const { id } = req.params;

        let foodData = await Food.findOne({ _id: id });

        if (!foodData) {
            return res.status(404).json({
                success: false,
                message: "Resource not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food Data is Found Succesfully",
            data: foodData,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error at Server",
        })
    }
}

export const DeleteOne = async (req, res) => {
    try {
        const { id } = req.params;

        let result = await Food.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: "Food Data is Deleted Succesfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error at Server",
        })
    }
}