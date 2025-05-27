// models/MegaMenu.js
import mongoose from "mongoose";

const megaMenuSchema = new mongoose.Schema({
  menuItems: [
    {
      // Either a regular menu item or a mega menu object
      name: { type: String, required: false }, // Required for regular menu items
      path: { type: String, required: false }, // Required for regular menu items
      megaMenu: {
        type: [
          {
            title: { type: String, required: true },
            items: [
              {
                name: { type: String, required: true },
                path: { type: String, required: true },
              },
            ],
          },
        ],
        required: false, // Only present for mega menu object
      },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("MegaMenu", megaMenuSchema);