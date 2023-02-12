const redis = require('redis');

class Redis {

  constructor() {
    this.connected = false;
    this.client = null;
  }

  async getConnection() {
    if (this.connected) {
      console.log("returning old redis client!");
      return this.client;
    }
    else {
      this.client =  redis.createClient();

      this.client.on('connect', function() {
        console.log('Redis Connecting!');
      });

      this.client.on('ready', function() {
        console.log('Redis Ready!');
        this.connected = true;
      });

      this.client.on( 'error', function (e) {
        console.log('Error: redis disconnected!', e);
        this.connected = false;
      });

      this.client.on( 'end', function () {
        console.log('End: redis connection ended!');
        this.connected = false;
      });

      try{
        console.log("connecting new redis client!");
        await this.client.connect();
        this.connected = true;
        console.log("connected to new redis client!");
      }
      catch(e){
        console.log("redis connect exception caught: " + e);
        return null;
      }
      
      return this.client;
    }
  }
    
}

module.exports = new Redis();
