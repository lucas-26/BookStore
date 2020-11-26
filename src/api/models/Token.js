const mongoose = require("mongoose");

const Token = new mongoose.Schema(
    {
        identifyId: {
            type: number
        },
        requestSource: {
            type: String
        },
        user: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Token", Token)