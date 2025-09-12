import { labels } from "../lang/messages/en/user.js";

document.title = labels.pageTitle;
document.getElementById("header-title").textContent = labels.headerTitle;
document.getElementById("header-subtitle").textContent = labels.headerSubtitle;
document.getElementById("write-link").textContent = labels.writeNotes;
document.getElementById("read-link").textContent = labels.readNotes;