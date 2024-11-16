// Permissions
const tablePermission = document.querySelector("[table-permission]");
if (tablePermission) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permission = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          let id = input.value;
          permission.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          if (checked) {
            permission[index].permissions.push(name);
          }
        });
      }
    });
    if (permission.length > 0) {
      const formChangePermission = document.getElementById(
        "form-change-permissions"
      );
      const input = formChangePermission.querySelector(
        `input[name='permissions']`
      );
      input.value = JSON.stringify(permission);
      formChangePermission.submit();
    }
  });
}
// End permissions

// Permissions Data Default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tablePermission = document.querySelector("[table-permission]");
  records.forEach((record, index) => {
    const permissions = record.permissions;

    permissions.forEach((permission) => {
      const row = tablePermission.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
// End Permissions Data Default

// Delete Role
const buttonsDelete = document.querySelectorAll("button[delete-button]");
if (buttonsDelete.length > 0) {
  const formDeleteRole = document.getElementById("form-delete-role");
  const path = formDeleteRole.getAttribute("data-path");
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isDelete = confirm("Bạn thực sự muốn xóa sản phẩm này?");
      if (isDelete) {
        const id = button.getAttribute("data-id");
        formDeleteRole.action = `${path}/${id}?_method=DELETE`;
        formDeleteRole.submit();
      }
    });
  });
}
// End Delete Role
