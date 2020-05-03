module.exports = usersRepository => {
  return {
    getAllUsers: () => {
      return usersRepository.getAllUsers();
    }
  }
}