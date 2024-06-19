const permissionForAdmin = async (req, res, next) => {
    try {
        const { role } = req.userData;
        console.log(role)
        if (role === 'superAdmin' || role === 'admin') {
            next()
        } else {
            return res.status(401).json({ message: "You don't have access for API" });
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: "Bad request" });
    }
}

const permissionForSuperAdmin = async (req, res, next) => {
    try {
        const { role } = req.userData;
        if (role == 'superAdmin') {
            next()
        } else {
            return res.status(401).json({ message: "You don't have access for API" });
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: "Bad request" });
    }
}

module.exports = { permissionForAdmin, permissionForSuperAdmin }