import Test from "../models/test";

export default {
    findAll: async(req, res) => {
        const tests = await Test.find().exec()
        res.status(200).json({
            tests
        })
    }
};
