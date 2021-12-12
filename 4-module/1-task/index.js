function makeFriendsList(friends) {
  const ulFriendsList = document.createElement('ul');
  ulFriendsList.insertAdjacentHTML('beforeend', friends.map(friend => `<li>${friend.firstName} ${friend.lastName}</li>`).join(''));
  return ulFriendsList;
}
