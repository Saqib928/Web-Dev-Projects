const quote = document.getElementById('quote');
const author = document.getElementById('author');
const api_url = 'https://quotes-api-self.vercel.app/quote';
async function getquote(url) {
  const response = await fetch(url);
  var data = await response.json();
  quote.innerHTML = data.quote;
    author.innerHTML = data.author;
    
}
getquote(api_url);
function publish(){
    window.open("https://x.com/intent/tweet?text=" + quote.innerHTML  +"%0A- by " + author.innerHTML, "X Window", "width=600,height=300");
}