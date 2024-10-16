// Change Status
const buttonStatus = document.querySelectorAll("[button-change-status]");
if (buttonStatus.length > 0) {
  const formStatus = document.getElementById("form-status");
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      let currentStatus = button.getAttribute("data-status");
      let id = button.getAttribute("data-id");
      let statusChange = currentStatus == "active" ? "inactive" : "active";
      let path = formStatus.getAttribute("path");
      let action = path + `/${statusChange}/${id}?_method=PATCH`;
      formStatus.action = action;
      formStatus.submit();
    });
  });
}
// End Change Status

// Delete Item
const deleteButton = document.querySelectorAll("button[button-delete]");
if (deleteButton.length > 0) {
  const formDelete = document.getElementById("form-delete-item");
  const path = formDelete.getAttribute("data-path");
  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const isDelete = confirm("Bạn thực sự muốn xóa sản phẩm này?");
      if (isDelete) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
// End Delete Item
