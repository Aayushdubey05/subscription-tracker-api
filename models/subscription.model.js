import mongoose  from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: [3, 'Subscription name must be at least 3 characters long'],
        maxLength: [50, 'Subscription name must be at most 50 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'],
        default: 'INR'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['news', 'sports', 'entertainment', 'education', 'health', 'technology', 'other'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto', 'UPI', 'other'],
        required: true
    },
    status: {
        type: String,
        enum: ['active','inactive', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value){
                return value <= new Date();
            },
            message: 'start date must be before or equal to the current date'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value){
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
} , {timestamps: true});


// Middleware to set renewal date based on frequency
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalDate = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365
            };

            this.renewalDate = new Date(this.startDate);
            this.renewalDate.setDate(this.renewalDate.getDate() + renewalDate[this.frequency]);
        }
    
    //Auto update status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
