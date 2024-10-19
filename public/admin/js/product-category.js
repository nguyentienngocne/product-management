// Filler Status
const buttonStatus = document.querySelectorAll("button[status-button]");
if (buttonStatus.length > 0) {
  const url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("status-button");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });

  // Add class active
  const status = url.searchParams.get("status");
  if (status) {
    const buttonActive = document.querySelector(
      `button[status-button='${status}']`
    );
    buttonActive.classList.add("active");
  } else {
    const buttonActive = document.querySelector(`button[status-button='']`);
    buttonActive.classList.add("active");
  }
}
// End Filler Status

// Form search
const searchForm = document.getElementById("form-search");
if (searchForm) {
  let url = new URL(window.location.href);
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = searchForm.querySelector("input[name='keyword']").value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form search
