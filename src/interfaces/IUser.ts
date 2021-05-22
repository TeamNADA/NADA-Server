export interface IUser {
    id: string,
    email: string,
    isOB: boolean,
    part: string,
    age: number,
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
        isMincho: boolean,
        isBumuk: boolean,
        isSoju: boolean
    }
}