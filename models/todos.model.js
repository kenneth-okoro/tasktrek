const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
        task: { type: String, required: true, trim: true },
        status: { 
            type: String, 
            enum: ['todo', 'doing', 'done'], 
            default: 'todo' },
        tags: { type: [String], default: [] },
    }, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);