const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const testimonialsSchema = require("../models/testimonials");
const testimonial = mongoose.model("BusinessUser", testimonialsSchema);


router.post("/api/create/testimonial/landing-page",(req,res)=>{
    const {name, picUrl, content} = req.body;
    const Testimonial = new testimonial({
        name, 
        picUrl,
        content,
    });

    Testimonial.save()
    .then((testimonial)=>{
        res.status(201).json({
            message:"New Testimonial Created"
        })
    }).catch((err)=>{
        res.status(400).json({
            error : err,
        });
    })
})


router.get("/api/testimonial/landing-page",(req,res)=>{
    testimonial.find({})
    .populate()
    .then((testimonials)=>{
        return res.status(200).json(testimonials);
    })
    .catch((err)=>{
        return res.status(400).json(
            {
                error : err,
            }
        )
    })
})