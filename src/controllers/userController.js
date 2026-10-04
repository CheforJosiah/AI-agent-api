import User from "../models/user.model";

export const getProfile = async(req, res, next) => {
    try{
        const user = await
        User.findById(req.session.userId).
        select("-password");

        if (!user) {
            return
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error) 
            next(error);
        }
    };

    export const updateProfile = async(req, res, next) => {
        try{
            const user = await
            User.findByIdAndUpdate(
                req.session.userId,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            ).select("-password");

            if (!user) {
                return
                res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "User profile updated successfully",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    };

    export const deleteProfile = async(req, res, next) => {
        try {
            const user = await
            User.findByIdDelete(req.session.userId);

            if (!user) {
                return
                res.status(404).json({
                    success: false,
                    message: "User not found",
            
                });
            }

            req.session.destroy((error) =>
            {
                if (error) {
                    return next(error);
                }

                res.status(200).json({
                    success: true,
                    message: "User account deleted successfully"
                });
            });
        } catch (error) {
            next(error);
        }

};
    
