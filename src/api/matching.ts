import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

const router = express.Router();
import User from "../models/User";

/** 유저의 궁합 매칭 기능
 * @route post api/matching
 * @desc matching User 
 * @access Public
 */

router.post(
    "/",
    async (req: Request, res: Response) => {
        
        const { myID, friendID } = req.body;

        console.log("req.body",myID, friendID)
        try{
            let myUserInfo = await User.findOne({id: myID});
            let friendUserInfo = await User.findOne({id: friendID});

            if(!myUserInfo){
                res.status(400).json({
                    errors: [{msg: "myID값이 없습니다."}]
                });
            }
            if(!friendUserInfo){
                res.status(400).json({
                    errors: [{msg: "friendID값이 없습니다."}]
                });
            }


            //매칭 알고리즘
            let myMbti = myUserInfo.essential.mbti;
            let friendMbti = friendUserInfo.essential.mbti;
            var matchingScore: number = 0;

            //MBTI 첫번째 문자 비교 (I/E)
            if (myMbti[0] == friendMbti[0]) {
                matchingScore += 20;
            } 
            else {
                matchingScore += 10;
            }

            //MBTI 두번째 문자 비교 (N/S)
            if (myMbti[1] == friendMbti[1]) {
                matchingScore += 15;
            } 
            else {
                matchingScore += 7;
            }

            //MBTI 세번째 문자 비교 (T/F)
            if (myMbti[2] == friendMbti[2]) {
                matchingScore += 15;
            } 
            else {
                matchingScore += 7;
            }

            //MBTI 세번째 문자 비교 (P/J)
            if (myMbti[3] == friendMbti[3]) {
                matchingScore += 20;
            } 
            else {
                matchingScore += 10;
            }

            // 민초, 반민초 취향 
            let myMincho = myUserInfo.essential.isMincho;
            let friendMincho = friendUserInfo.essential.isMincho;

            if (myMincho == friendMincho) {
                matchingScore += 10;
            }
            else {
                matchingScore -= 10;
            }
        

            // 찍먹,부먹 취향 
            let myBumuk = myUserInfo.essential.isBumuk;
            let friendBumuk = friendUserInfo.essential.isBumuk;

            if (myBumuk == friendBumuk) {
                matchingScore += 10;
            }
            else {
                matchingScore -= 10;
            }

            // 주종 취향 
            let mySoju = myUserInfo.essential.isSoju;
            let friendSoju = friendUserInfo.essential.isSoju;

            if (mySoju == friendSoju) {
                matchingScore += 10;
            }
            else {
                matchingScore -= 10;
            }


            var matchMsg:string = "";

            if (matchingScore > 0 && matchingScore <= 20 ) {
                matchMsg = "와우~! 환상의 콤비네요~!";
            }
            else if (matchingScore > 20 && matchingScore <= 40) {
                matchMsg = "이정도면 인연이지 뭐~"
            }
            else if (matchingScore > 40 && matchingScore <= 60) {
                matchMsg = "새로운 공통점도 찾아봐요!"
            }
            else if (matchingScore > 60 && matchingScore <= 80) {
                matchMsg = "반은 넘었으니까 소울메이트!"
            }
            else {
                matchMsg = "와우~! 환상의 콤비네요~!"
            }

            return res.status(200).json({
                "success" : true,
                "message" : "친구와의 매칭에 성공했습니다! 짝짝쿵!!",
                "data" : {
                    "myID" : myID,
                    "friendID" : friendID,
                    "percent" : matchingScore,
                    "matchMsg" : matchMsg
                }
            });
        
        // return 시켜줄 값 여기서 파싱 시켜서 주기
        }catch(err){
            console.log(err.message);
            res.status(500).json({
                errors: [{msg: "Server Error"}]
            });
        }
    }
)
module.exports = router;