import amyAvatar from "../assets/images/avatars/image-amyrobson.png"
import maxAvatar from "../assets/images/avatars/image-maxblagun.png"
import ramsesAvatar from "../assets/images/avatars/image-ramsesmiron.png"
import juliusAvatar from "../assets/images/avatars/image-juliusomo.png"

export type user = {username: string, avatar: string}

export const usersArray: user[] = [
    {username: "amyrobson", avatar: amyAvatar},
    {username: "maxblagun", avatar: maxAvatar},
    {username: "ramsesmiron", avatar: ramsesAvatar},
    {username: "juliusomo", avatar: juliusAvatar}
]