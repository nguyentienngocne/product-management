// Button status
const statusButtons = document.querySelectorAll("[button-status]");
if (statusButtons.length > 0) {
  let url = new URL(window.location.href);

  statusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);
      if (status) {
        url.searchParams.set("status", status);
        url.searchParams.set("page", "1");
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form Search
const formSearch = document.getElementById("form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);
  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']");
  const inputArray = Array.from(inputIds);

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputIds.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputIds.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputArray.forEach((input) => {
    input.addEventListener("click", () => {
      const index = inputArray.findIndex((input) => !input.checked);
      if (index === -1) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

//End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("form[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    const typeChange = document.querySelector("select.form-control").value;
    if (typeChange == "deleted-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");
      if (!confirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let Ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          Ids.push(`${id}-${position}`);
        } else {
          Ids.push(id);
        }
      });
      inputIds.value = Ids.join(", ");
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi");
    }
  });
}
// End Change Form Multi

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeButton = showAlert.querySelector("[close-alert]");
  closeButton.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const inputImage = uploadImage.querySelector("[upload-image-input]");
  const previewImage = uploadImage.querySelector("[upload-image-preview]");
  inputImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImage.src = URL.createObjectURL(file);
    }
  });
}

const closeButton = uploadImage.querySelector(".close-button");
if (closeButton) {
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    const inputImage = document.querySelector("[upload-image-input]");
    const previewImage = document.querySelector("[upload-image-preview]");
    inputImage.value = "";
    previewImage.src = "";
  });
}
// End Upload Image
