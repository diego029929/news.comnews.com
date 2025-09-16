function openArticle() {
  const article = document.getElementById("full-article");
  article.classList.add("active");
  window.scrollTo({ top: article.offsetTop - 60, behavior: "smooth" });
}
