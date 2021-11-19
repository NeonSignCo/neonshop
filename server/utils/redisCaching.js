const { redisClient } = require("../server")

const redisCaching = (key, asyncMethod, timeInSec) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, async (err, data) => {
        if (err) reject(err.message);

        if (!data) {
          const response = await asyncMethod;
          
          if (timeInSec) {
            redisClient.setex(key, timeInSec, JSON.stringify(response));
          } else {
            redisClient.set(key, JSON.stringify(response));
          }
          return resolve(response);
        }
        
        resolve(JSON.parse(data));
      });
    });
}
 

module.exports = redisCaching; 