export default class CKEditorUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const data = new FormData();
    const file = await this.loader.file;
    data.append("image", file);

    const response = await fetch("http://localhost:3030/blog/upload-image", {
      method: "POST",
      body: data,
    });

    const res = await response.json();
    if (!response.ok) throw new Error(res.error || "Upload failed");

    return { default: `http://localhost:3030${res.url}` }; // 👈 Append backend path
  }

  abort() {
    // handle abort if necessary
  }
}
