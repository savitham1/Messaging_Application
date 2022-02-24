const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// global constants -- environment variable stored in a seperate file [.env].
// These details is obtained from Stream Account online.
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (requests, resource) => {
    try {
        const { fullName, username, password, phoneNumber } = requests.body;

        // create a random -- crypto string -- of hexadecimal digits.
        const userId = crypto.randomBytes(16).toString('hex');

        // Connect to server using confidentials information.
        const serverClient = connect(api_key, api_secret, app_id);

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10); // converts the text password to hashed password

        const token = serverClient.createUserToken(userId);

        resource.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });

    } catch (error) {
        console.log(error);
        resource.status(500).json({ message : error });
    }
};

const login = (requests, resource) => {
    try {
        const { username, password } = requests.body;
        
        const serverClient = connect(api_key, api_secret, app_id);

        // new instance of a stream chat
        const client = StreamChat.getInstance(api_key, api_secret);

        // not creating the user; we are taking the username and querying all the users in the database to check if there is a match!
        const { users } = await client.queryUsers({ name: username });

        // User not found in the database
        if (!users.length) {
            return resource.status(400).json({ message: 'User not found'});
        }
        
        // Found in the database -- decrpty the hashed password and compare it with the password entered. 
        const success = await bcrypt.compare(password, users[0].hashedPassword);  // Password authentication!!

        const token = serverClient.createUserToken( users[0].id ); //get the server's token for the user

        // If the password authentication was success then send all the data to the client.
        if (success) {
            resource.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id});
        }
        else {
            resource.status(500).json({ message: 'Incorrect password' });
        }

    } catch (error) {
        console.log(error);
        resource.status(500).json({ message : error });
    }
}

module.exports({ signup, login });