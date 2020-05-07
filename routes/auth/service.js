module.exports = repository => {
  return {
    getAllUsers: () => {
      return repository.getAllUsers();
    },
    authWith_g_id: async (profile) => {
      const result = await repository.findUserWith_g_id(profile.id);
      let user = result.rows[0];
      if (!user) {
        const result = await repository.createUserWith_g_profile(profile);
        user = result.rows[0];
        console.log("Created User: ", user);
      } else { console.log("Found User: ", user)};
      return user
    }
  }
}