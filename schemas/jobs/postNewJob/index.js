const mongoose = require("mongoose");

const JobSchema =  new mongoose.Schema({
    category: {
        type: String
    },
    page: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tags: {
        type: Array
    },
    task: {
        type: String
    },
    coverLetterRequired: {
        type: Boolean
    },
    questionsBeforeApplying: {
        type: Array
    },
    typeOfApplicant: {
        type: String
    },
    typeOfProject: {
        type: String
    },
    selectedTags: {
        type: Array
    },
    languagesSelected: {
        type: Array
    },
    poster: {
        type: String
    },
    skillLevel: {
        type: String
    },
    whoCanApply: {
        type: String
    },
    multipleFreelancers: {
        type: Boolean
    },
    multipleOrSingularFreelancersRequired: {
        type: String
    },
    numberOfFreelancersRequired: {
        type: Number
    },
    jobSuccessScore: {
        type: String
    },
    minAmountEarnedToApply: {
        type: Number
    },
    pricing: {
        type: Object
    },
    unique_id: {
        type: String
    },
    date: {
        type: String
    },
    system_date: {
        type: Number
    },
    tokensRequiredToApply: {
        type: Number
    },
    proposals: {
        type: Number
    }
});

module.exports = User = mongoose.model("job", JobSchema);