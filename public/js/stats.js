const runRatio = async () => {
  const getMyId = await fetch('/api/users/my-id', {
    method: "GET",
  });

  const myId = await getMyId.json();

  console.log(myId);

  const getThisUser = await fetch(`/api/users/user/${myId}`, {
    method: "GET",
  });

  const thisUser = await getThisUser.json();

  console.log(thisUser);

  const ratio = thisUser.win / thisUser.loss;

  console.log(ratio);

  const docElement = document.querySelector("#stat-ratio");
  docElement.innerHTML = ratio;

}
runRatio();