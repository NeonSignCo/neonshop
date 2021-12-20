import Session from "../server/models/Session";
import User from "../server/models/User";

const getLoggedInUser = async (req) => {
    try {
        const { token } = req.cookies;
        if (!token) return null;
        
        const session = await Session.findOne({ token, status: "valid" });
        if (!session) return null;
        
        const loggedInUser = await User.findById(
          { _id: session.userId },
          { password: 0, _id: 0 }
        );
        if (!loggedInUser) return null; 

        const user = JSON.parse(JSON.stringify(loggedInUser));

        return user;
    } catch (error) {
        return null;
    }
}

export default getLoggedInUser
