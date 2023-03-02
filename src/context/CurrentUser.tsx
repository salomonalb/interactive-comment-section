import { createContext } from "react";
import avatarImg from "../assets/images/avatars/image-amyrobson.webp"

export const CurrentUser = createContext({username: 'migule', avatar: avatarImg})