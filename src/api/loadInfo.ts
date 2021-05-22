import express, { Request, Response } from "express";

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
                    errors: [{msg: "유저가 존재하지 않습니다."}]
                });
            }
            
            res.status(200).json({"success":true, "msg": "유저 조회에 성공하였습니다.", "data":user});
        
        }catch(err){
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
)

module.exports = router;