function namify(users) {
  let userNames = [];
  
  for (let user of users) {
    userNames.push(user.name);
  }
  
  return userNames;
}