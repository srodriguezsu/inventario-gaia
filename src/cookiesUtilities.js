import Cookies from "js-cookie";

export function getRole (){
    return Cookies.get('loginStatus') ? Cookies.get('loginStatus') : false;
}