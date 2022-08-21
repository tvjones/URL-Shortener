async function getURL() {
  let inputField =  document.getElementById("url-entered")
  let longURL = inputField.value;
  let errorMessage = document.getElementById('error-message');

  //if no url is entered display error message
  if (longURL === "") {
    inputField.className = "p-[1.5rem] font-bold w-[80%] h-[50%] rounded text-[#9a9a9a] top-[27%] relative placeholder:text-[#ff6666] border-[#ff6666] border-[2px]"
    errorMessage.className = "w-[80%] text-[1.5rem] relative bottom-[2vh] m-auto  text-[#ff6666] italic block"
  } else {
    errorMessage.className = "w-[80%] text-[1.5rem] relative bottom-[2vh] m-auto  text-[#ff6666] italic hidden"
    inputField.className = "p-[1.5rem] font-bold w-[80%] h-[50%] rounded text-[#9a9a9a] top-[27%] relative"
    url = "https://api.shrtco.de/v2/shorten?url=" + longURL;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data["result"]["short_link"]);
    addLink(longURL, data["result"]["full_short_link"]);
  }
}

const addLink = (longLink, shortLink) => {
  //creating elements
  const outerDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  const ogLink = document.createElement("p");
  const newLink = document.createElement("a");
  const copy = document.createElement("button");


  copy.addEventListener("click", () => {
    //change text and colour of button
    copy.innerHTML = "Copied!";
    copy.className =
      "text-white rounded border-x-[2rem] h-[90%] border-y-[1rem] border-[#3b3054] bg-[#3b3054]";

    //copy text to clipboard
    navigator.clipboard.writeText(newLink);
  });

  newLink.innerHTML = shortLink;
  newLink.href = shortLink;
  newLink.target = "_blank";
  ogLink.innerHTML = longLink;
  copy.innerHTML = "Copy";
  copy.className =
    "text-white rounded border-x-[2rem] h-[90%] border-y-[1rem] border-[#2acfcf] bg-[#2acfcf]";
  innerDiv.appendChild(newLink);
  innerDiv.appendChild(copy);
  innerDiv.className = "w-[30%] flex justify-between";
  outerDiv.className =
    "rounded flex m-auto justify-between px-[2rem]  my-[3vh] py-[1rem] bg-white w-[80%]";
  outerDiv.appendChild(ogLink);
  outerDiv.appendChild(innerDiv);

  console.log(innerDiv);
  document.getElementById("links").appendChild(outerDiv);

  //adjusting padding on the [id='stats'] element

  const stats = document.getElementById("stats");

  let currentPadding = window
    .getComputedStyle(stats, null)
    .getPropertyValue("padding-top");
  console.log(currentPadding);

  currentPadding = parseInt(currentPadding.slice(0, currentPadding.length - 2));
  console.log(currentPadding);

  //add 8vh to the padding-top
  //coverting from vh to px
  let additionalPadding = document.documentElement.clientHeight * 0.1;
  const finalPadding = currentPadding + additionalPadding;

  stats.style.paddingTop = finalPadding.toString() + "px";
};
