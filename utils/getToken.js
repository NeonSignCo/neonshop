import Token from '../server/models/token';
import connectDb from '../server/connectDb';
    
const getToken = async (token) => {
    try {  
        await connectDb();
        const existingToken = await Token.findOne({ token }); 
        if (!existingToken) return null;
        return JSON.parse(JSON.stringify(existingToken));
       
    } catch (error) {
        console.log(error)
        return null;
    }
}             

export default getToken;
