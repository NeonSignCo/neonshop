import Session from "../models/session";

const initSession = (userId) => new Promise( async (resolve, reject) => {
 try {
     const token = await Session.genToken();
      const newSession = await Session.findOneAndUpdate(
        { userId },
        { $set: { userId, token } },
        { new: true, upsert: true }
     );
     
     resolve(newSession); 
 } catch (error) {
     reject(error)
 }
})

export default initSession;