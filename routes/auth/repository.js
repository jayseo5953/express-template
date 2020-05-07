module.exports = db => {
  return {
    getAllUsers: () => {
      const qs = `SELECT * FROM users;`;
      return db.query(qs);
    },
    findUserWith_g_id: (g_id) => {
      const qs = `SELECT * FROM users WHERE google_id = $1;`
      return db.query(qs, [g_id]);
    },
    createUserWith_g_profile: (profile)=>{
      const user = profile._json;
      const username = user.name;
      const email = user.email;
      const google_id = user.sub;
      const photo = user.picture;

      console.log(username, email, google_id, photo)

      const qs = `INSERT INTO users (username, email, google_id, photo)
      VALUES ($1,$2,$3,$4) RETURNING *`
      
      return db.query(qs, [username,email,google_id,photo])
    }
  }
};

// id SERIAL PRIMARY KEY NOT NULL,
// username VARCHAR(255) NOT NULL,
// email VARCHAR(255) NOT NULL,
// google_id TEXT NOT NULL,
