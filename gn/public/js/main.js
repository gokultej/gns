// Theme switching
function switchTheme(theme) {
  document.body.className = theme + "-theme";
}

// Font size control
let fontSize = 16;

function increaseFontSize() {
  fontSize += 2;
  document.getElementById("content").style.fontSize = fontSize + "px";
}

function decreaseFontSize() {
  fontSize = Math.max(12, fontSize - 2); // Ensure font size does not go too small
  document.getElementById("content").style.fontSize = fontSize + "px";
}

// Fetch Wikipedia article
async function fetchArticle() {
  const title = document.getElementById("article-title").value.trim();
  if (!title) {
    alert("Please enter an article title.");
    return;
  }

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Article not found");
    }

    const data = await response.json();
    displayArticle(data);
  } catch (error) {
    document.getElementById("article-box").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Display the fetched article content
function displayArticle(data) {
  const articleBox = document.getElementById("article-box");
  articleBox.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.extract}</p>
    ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title}" />` : ""}
  `;
}

// Read the article content aloud
function readArticle() {
  const articleBox = document.getElementById("article-box");
  const textToRead = articleBox.innerText; // Get the text content of the article box

  if (!textToRead) {
    alert("Please load an article first.");
    return;
  }

  // Cancel any ongoing speech synthesis
  window.speechSynthesis.cancel();

  // Create a new speech synthesis utterance for the text
  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = "en-US"; // Set language; adjust if needed
  utterance.rate = 1; // Set the speaking rate; adjust for preference
  utterance.pitch = 1; // Set the pitch; adjust for preference

  // Start speaking
  window.speechSynthesis.speak(utterance);
}
