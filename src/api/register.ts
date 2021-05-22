import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();
import User from "../models/User";

/** 유저 등록 기능
 * @route post api/register
 * @desc Reisger User
 * @access Public
 */

 // data 제약 사항 체크해야함.
 router.post(
     "/",
     [ check()],
     async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        }
        console.log("GET", req.body);

        const { 
            id,
            email,
            isOB,
            part,
            age,
            insta,
            school,
            name,
            station,
            keyword, 
            detail, 
            essential }
        = req.body;

        try{
            let user = await User.findOne({id});
            if(user){
                res.status(400).json({
                  errors: [{msg: "User alreday exists"}]
                });
              }

            user = new User({
                id,
                email,
                isOB,
                part,
                age,
                insta,
                school,
                name,
                station,
                keyword, 
                detail, 
                essential
            });
            
            await user.save();
            res.status(200).json({"success" : true, "msg" : "유저 등록에 성공하였습니다."});

        }catch(err){
            console.error(err.message);
            res.status(500).send("Server Error");
        }
     }
 )

module.exports = router;