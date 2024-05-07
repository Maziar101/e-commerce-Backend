export const smsHandler = async (mobileNumber,message)=>{
    try{
        const res = await fetch('https://api.limosms.com/api/sendsms',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                ApiKey:process.env.SMS_KEY,
            },body:JSON.stringify({
                Message: [message],
                SenderNumber: "10000000002027",
                MobileNumber: [mobileNumber],
            }),
        });
        const data = await res.json();
        return data
    }catch(err){
        return err
    }
};