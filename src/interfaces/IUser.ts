export interface IUser {
    id: string,
    email: string,
    isOB: boolean,
    part: string,
    age: string,
    insta: string,
    school: string,
    name: string,
    station: string,
    keyword: string,
    detail: {
        favBaskin: string,
        favFood: string,
        nickname: string,
        msg: string,
    }
    essential: {
        mbti: string,
        inMincho: boolean,
        isBumuk: boolean,
        isSoju: boolean
    }
}