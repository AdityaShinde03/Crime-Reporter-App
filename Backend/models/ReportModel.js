import mongoose from 'mongoose';

// sample data
/*    {
        "latitude": "37.7749",
        "longitude": "-122.4194",
        "crimeplace": "San Francisco",
        "severity": "High",
        "type": "Robbery",
        "description": "A robbery occurred at the corner store.",
        "crimetime": "2024-06-29T15:30:45.123Z",
        "userId": "60b8d6c8f1b2b74e4f8b4567",
        "media": "robbery_photo.jpg",
        "isAnonymous": false
    }
*/

const ReportSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: [true, "Latitude is required"],
        validate: {
            validator: function(v) {
                return /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(v);  // Regex for valid latitude
            },
            message: props => `${props.value} is not a valid latitude!`
        }
    },
    longitude: {
        type: String,
        required: [true, "Longitude is required"],
        validate: {
            validator: function(v) {
                return /^-?((1[0-7]\d(\.\d+)?|([1-9]?\d(\.\d+)?))|180(\.0+)?)$/.test(v);  // Regex for valid longitude
            },
            message: props => `${props.value} is not a valid longitude!`
        }
    },
    crimeplace: {
        type: String,
        required: [true, "Place is required"],
        minlength: [3, "Place must be at least 3 characters long"]
    },
    severity: {
        type: String,
        enum: ["High", "Low", "Medium"],
        default: "Low",
        required: [true, "Severity is required"]
    },
    type: {
        type: String,
        required: [true, "Type of crime is required"],
        minlength: [3, "Type of crime must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters long"]
    },
    crimetime: {
        type: String,
        required: [true, "Crime time is required"],
        validate: {
            validator: function(v) {
                return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(v);  // Regex for ISO 8601 format
            },
            message: props => `${props.value} is not a valid ISO 8601 datetime!`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    },
    media: {
        type: String,
        validate: {
            validator: function(v) {
                return /\.(jpg|jpeg|png|mp4|avi|mkv)$/i.test(v); 
            },
            message: props => `${props.value} is not a valid media file!`
        }
    },
    isAnonymous: {
        type: Boolean,
        default: false
    }
});

const ReportModel = mongoose.model('Report', ReportSchema);

export default ReportModel;
