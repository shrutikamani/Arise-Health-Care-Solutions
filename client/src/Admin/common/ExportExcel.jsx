import { utils, writeFile } from "xlsx";

const ExportExcel = (data, fileName = "data.xlsx") => {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  const formattedData = data.map((item, index) => ({
    "No.": index + 1,
    "First Name": item.FirstName,
    "Last Name": item.LastName,
    "Email": item.email,
    "Mobile Number": item.MobileNumber,
    "City": item.City,
    "PinCode": item.PinCode,
    "Address": item.Address,
    "Message": item.Message,
    "Status": item.status || "Pending",
    "Updated At": new Date(item.updatedAt).toLocaleDateString("en-GB"),
  }));

  const worksheet = utils.json_to_sheet(formattedData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Data");
  writeFile(workbook, fileName);
};

export default ExportExcel;
