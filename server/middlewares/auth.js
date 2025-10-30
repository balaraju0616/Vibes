export const protect = (req, res, next) => {
    try {
        // Clerk middleware already sets req.auth as an object
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}