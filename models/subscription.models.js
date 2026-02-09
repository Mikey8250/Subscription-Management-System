import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required "],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Subscription name is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "Rupees"],
      default: "USD",
    },
    frequency: {
      type: String,
      lowercase: true,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      lowercase: true,
      enum: [
        "sports",
        "fashion",
        "news",
        "entertainment",
        "finance",
        "politics",
        "others",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancel", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "StartDate must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function validate(value) {
          return value > this.startDate;
        },
        message: "renewal date must be after than start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Auto-calculate renewal date if missing
subscriptionSchema.pre('save',async function() {
  if(!this.renewalDate){
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365 
    }
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }
  if (this.renewalDate < new Date()) {
    this.status = 'expired'
  }

})


const Subscription = mongoose.model('Subscription', subscriptionSchema)
export default Subscription