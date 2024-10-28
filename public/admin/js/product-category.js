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

// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
  const formStatus = document.querySelector("#form-status");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const currentStatus = button.getAttribute("data-status");
      const changeStatus = currentStatus == "active" ? "inactive" : "active";
      const path = formStatus.getAttribute("path");
      const action = `${path}/${changeStatus}/${id}`;
      formStatus.action = action;
      formStatus.submit();
    });
  });
}
// End Change Status

// Delete Item
const deleteButton = document.querySelectorAll("button[button-delete]");
if (deleteButton.length > 0) {
  const formDelete = document.querySelector("#form-delete-item");
  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const path = formDelete.getAttribute("data-path");
      const action = `${path}/${id}`;
      formDelete.action = action;
      formDelete.submit();
    });
  });
}
// End Delete Item
