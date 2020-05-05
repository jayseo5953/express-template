module.exports = repository => {
  return {
    getAllUsers: () => {
      return repository.getAllUsers();
    }
  }
}