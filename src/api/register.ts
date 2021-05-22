import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();
import User from "../models/User";

/** 유저 등록 기능
 * @route post api/register
 * @desc Reisger User
 * @access Public
 */

const check_func = [
    check("email", "유효한 이메일 정보를 입력해주세요!").isEmail(),
    check("id", "아이디를 입력해주세요!").not().isEmpty(),
    check("email", "이메일을 입력해주세요!").not().isEmpty(),
    check("part", "어떤 파트인지 입력해주세요!").not().isEmpty(),
    check("age", "나이를 선택해주세요!").not().isEmpty(),
    check("insta", "인스타 아이디를 입력해주세요!").not().isEmpty(),
    check("school", "학교를 입력해주세요!").not().isEmpty(),
    check("name", "이름을 입력해주세요!").not().isEmpty(),
    check("station", "가까운 역을 입력해주세요!").not().isEmpty(),
    check("keyword", "키워드를 입력해주세요!").not().isEmpty(),
    check("essential.mbti", "MBTI를 입력해주세요!").not().isEmpty(),
 ]

 router.post(
    "/",
    check_func,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

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
                  errors: [{msg: "유저가 이미 존재합니다."}]
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
            res.status(200).json({"success":true, "msg" : "유저 등록에 성공하였습니다."});

        }catch(err){
            console.error(err.message);
            res.status(500).send("Server Error");
        }
     }
 )

module.exports = router;