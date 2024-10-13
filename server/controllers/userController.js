import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js'

export const updateProfile = async (req, res) => {
    try {
        const {image, ...otherData} = req.body;
        let updatedData = otherData
        if(image){
            if(image.startsWith("data:image")) {//if it base64 format
                try {
                    const uploadResponse = await cloudinary.uploader.upload(image)
                    updatedData.image = uploadResponse.secure_url
                } catch (error) {
                    console.log("Error uploading image")
                    return res.status(400).json({
                        success: false,
                        message: "Error uploading image",
                    })
                }
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {new: true})
        res.status(200).json({
            success: true,
            user: updatedUser,
        })


    } catch (error) {
        console.log("Error in updateProfile", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}