const userModel = require("../../src/model/user");
const bcrypt = require("bcrypt");
const superAdmin = require("./data.json");

const addSuperAdmin = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const password = await bcrypt.hashSync(superAdmin.password, salt)
        superAdmin.password = password
        const superAdminType = await userModel.find({ role: 'superAdmin' })
        if (superAdminType.length) {
            console.log('superAdmin already added')
            return false
        }
        await userModel.create(superAdmin)
        console.log('superAdmin created successfully')
    } catch (error) {
        console.log(error);
        return
    }
}

module.exports = addSuperAdmin;