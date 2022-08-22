async function getURL() {
  let inputField =  document.getElementById("url-entered")
  let longURL = inputField.value;
  let errorMessage = document.getElementById('error-message');

  //if no url is entered display error message
  if (longURL === "") {
    inputField.className = "sm:w-[90%] sm:h-[40%] sm:top-[15%] sm:m-auto sm:block p-[1.5rem] font-bold w-[80%] h-[50%] rounded text-[#9a9a9a] top-[27%] relative placeholder:text-[#ff6666] border-[#ff6666] border-[2px]"
    errorMessage.className = "sm:w-[70%] sm:m-auto w-[80%] text-[1.5rem] relative bottom-[2vh] m-auto  text-[#ff6666] italic sm:top-[15%] block"
  } else {
    errorMessage.className = "sm:w-[70%] sm:m-auto w-[80%] text-[1.5rem] relative bottom-[2vh] m-auto  text-[#ff6666] italic sm:top-[15%] hidden "
    inputField.className = "sm:w-[90%] sm:h-[40%] sm:top-[15%] sm:m-auto sm:block p-[1.5rem] font-bold w-[80%] h-[50%] rounded text-[#9a9a9a] top-[27%] relative"
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
  const horizontalRule = document.createElement("hr")

  horizontalRule.className = "w-[100%] h-[4px] "
  copy.addEventListener("click", () => {
    //change text and colour of button
    copy.innerHTML = "Copied!";
    copy.className =
      "sm:w-[100%] sm:block text-white rounded border-x-[2rem] h-[90%] border-y-[1rem] border-[#3b3054] bg-[#3b3054]";

    //copy text to clipboard
    navigator.clipboard.writeText(newLink);
  });

  newLink.innerHTML = shortLink;
  newLink.href = shortLink;
  newLink.target = "_blank";
  ogLink.innerHTML = longLink;
  newLink.className = "text-[#2acfcf]"
  copy.innerHTML = "Copy";
  copy.className =
    "sm:w-[100%] sm:block text-white rounded border-x-[2rem] h-[90%] border-y-[1rem] border-[#2acfcf] bg-[#2acfcf]";
  innerDiv.appendChild(newLink);
  innerDiv.appendChild(copy);
  innerDiv.className = "sm:m-auto sm:w-[100%] px-[2rem] w-[30%] sm:block flex justify-between";
  outerDiv.className =
    "sm:block rounded flex m-auto justify-between  my-[3vh] py-[1rem] bg-white w-[80%]";
  ogLink.className = "px-[2rem] py-[1rem]"
  outerDiv.appendChild(ogLink);
  outerDiv.appendChild(horizontalRule);
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
  let additionalPadding = document.documentElement.clientHeight * 0.18;
  const finalPadding = currentPadding + additionalPadding;

  stats.style.paddingTop = finalPadding.toString() + "px";
};
