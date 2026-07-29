
import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers"




export const getNewAccessTokenByRefreshToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if(!refreshToken){
        return {
            success:false,
            message:"Refresh token not found!"
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`,{
        method: "POST",
        headers:{
            Cookie: `refreshToken=${refreshToken}`
        },
        cache:"no-cache"
    })
    const result = await res.json();
    return result
}


export const isAccessTokenExist = async()=>{
    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value||null;
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if(!accessToken && !refreshToken){
        // throw new Error("User Not Logged In!");
        return false
    }

    const decodedAccessToken = accessToken? jwtUtils.verifiedToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken? jwtUtils.verifiedToken(refreshToken, process.env.JWT_REFRESH_SECRET as string): null;


    if(!decodedAccessToken?.success && decodedRefreshToken){
        const result = await getNewAccessTokenByRefreshToken();
        if(result.success){
            const newAccessToken = result.data.accessToken;
            cookieStore.set("accessToken", newAccessToken,{
                httpOnly:true,
                maxAge:60*60*24,
                sameSite:"lax"
            })
            accessToken = newAccessToken
        } 
    }

    return accessToken
}

