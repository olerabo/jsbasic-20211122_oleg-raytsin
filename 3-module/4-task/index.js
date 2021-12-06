function showSalary(users, age) {

  let result = "";

  for (let user of users) {
    if (user.age <= age) {
      result += `${user.name}, ${user.balance}\n`;
    }
  }
  
  return result.slice(0, -1);
}