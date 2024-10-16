module.exports = (query) => {
  let fillerStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (query.status) {
    const index = fillerStatus.findIndex((item) => item.status == query.status);
    fillerStatus[index].class = "active";
  } else {
    const index = fillerStatus.findIndex((item) => item.status == "");
    fillerStatus[index].class = "active";
  }

  return fillerStatus;
};
