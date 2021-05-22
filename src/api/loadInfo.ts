import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();
import User from "../models/User";

/** 유저 조회 기능
 * @route post api/loadInfo
 * @desc load user's information
 * @access Public
 */

router.post(
    "/",
    async (req: Request, res: Response) => {
        
        const { id } = req.body;

        try{
            let user = await User.findOne({id});

            if(!user){
                res.status(400).json({
                errors: [{msg: "User not exists"}]
                });
            }
            
            console.log("LOAD", user);
        
        // return 시켜줄 값 여기서 파싱 시켜서 주기
        }catch(err){
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
)

module.exports = router;