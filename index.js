const data = [
  {
    id: "1",
    title: "фотографии",
    author: "Михаил",
    dataTime: "25.01.2021 15.00",
    text: "подробности",
    status: false,
  },
  {
    id: "2",
    title: "праздник",
    author: "Михаил",
    dataTime: "28.01.2021 15.00",
    text: "подробности",
    status: false,
  },
  {
    id: "3",
    title: "обсуждения",
    author: "Михаил",
    dataTime: "30.01.2021 15.00",
    text: "подробности",
    status: true,
  },
  {
    id: "4",
    title: "вопросы",
    author: "Михаил",
    dataTime: "30.01.2021 15.00",
    text: "подробности",
    status: true,
  },
];

let messages = !localStorage.getItem("widgetMessages")
  ? data
  : JSON.parse(localStorage.getItem("widgetMessages"));

let openWidget = false;

const containerBody = document.body;

const wrapper = document.createElement("div");

wrapper.style.width = "80%";
wrapper.style.margin = "0 auto";

const widget = document.createElement("button");

widget.style.position = "absolute";
widget.style.bottom = "0";
widget.style.width = "100px";
widget.style.height = "100px";
widget.style.margin = "40px 0";
widget.style.border = "none";
widget.style.background = "url('email.png') no-repeat right top/cover";
widget.style.outline = "none";
widget.style.cursor = "pointer";

const unread = document.createElement("div");

unread.style.position = "absolute";
unread.style.top = "0";
unread.style.left = "70%";
unread.style.display = "flex";
unread.style.alignItems = "center";
unread.style.justifyContent = "center";
unread.style.width = "40px";
unread.style.height = "40px";
unread.style.backgroundColor = "red";
unread.style.color = "white";
unread.style.borderRadius = "50%";

const amountUnread = messages.filter((el) => !el.status).length;
if (amountUnread) unread.innerHTML = amountUnread;
else unread.style.display = "none";

widget.appendChild(unread);
wrapper.appendChild(widget);
containerBody.appendChild(wrapper);

const blockAllMessages = document.createElement("div");
blockAllMessages.style.paddingLeft="100px"
blockAllMessages.style.display = "none";

renderMessages(messages, blockAllMessages, unread);
wrapper.appendChild(blockAllMessages);

widget.addEventListener('mouseover', function(ev) {
  widget.style.boxShadow="0px 5px 30px 2px blue";
})
widget.addEventListener('mouseout', function(ev) {
  widget.style.boxShadow="none";
})
widget.addEventListener("click", function (ev) {
  ev.preventDefault();
  openWidget = !openWidget;
  openWidget
    ? (blockAllMessages.style.display = "block")
    : (blockAllMessages.style.display = "none");
});

function renderMessages(arrs, blockAllMessages) {
  for (arr of arrs) {
    const blockMessage = document.createElement("div");
    blockMessage.style.display = "flex";
    blockMessage.style.alignItems = "baseline";
    blockMessage.style.flexWrap = "wrap";
    blockMessage.style.width = "460px";
    blockMessage.style.borderBottom = "1px solid grey";

    const titleMessage = document.createElement("h2");
    titleMessage.style.width = "100%";
    titleMessage.style.padding = "0 20px";
    titleMessage.style.color = "blue";
    titleMessage.innerText = arr.title;

    const authorMessage = document.createElement("h3");
    authorMessage.style.padding = "0 20px";
    authorMessage.style.fontStyle = "italic";
    authorMessage.innerText = arr.author;

    const dataTimeMessage = document.createElement("p");
    dataTimeMessage.style.padding = " 0 20px";
    dataTimeMessage.style.color = "blue";
    dataTimeMessage.innerText = arr.dataTime;

    const textMessage = document.createElement("a");
    textMessage.setAttribute("href", "#");
    textMessage.innerText = arr.text;

    const statusMessage = document.createElement("div");
    statusMessage.style.width = "20px";
    statusMessage.style.height = "20px";
    statusMessage.style.borderRadius = "50%";
    statusMessage.style.margin = "auto";
    statusMessage.style.backgroundColor = arr.status
      ? "rgba(134, 238, 139, .5)"
      : "red";

    let dataMessage = arr;
    textMessage.addEventListener("click", function (ev) {
      ev.preventDefault();
      if (!dataMessage.status) {
        unread.innerText -= 1;
        statusMessage.style.backgroundColor = "rgba(134, 238, 139, .5)";
        dataMessage.status = true;
      }

      if (unread.innerText === "0") unread.style.display = "none";

      messages.forEach((el) => {
        if (el.id === dataMessage.id) el.status == dataMessage.status;
      });
      localStorage.setItem("widgetMessages", JSON.stringify(messages));
    });

    blockMessage.appendChild(titleMessage);
    blockMessage.appendChild(dataTimeMessage);
    blockMessage.appendChild(authorMessage);
    blockMessage.appendChild(textMessage);
    blockMessage.appendChild(statusMessage);
    blockAllMessages.appendChild(blockMessage);
  }
}
