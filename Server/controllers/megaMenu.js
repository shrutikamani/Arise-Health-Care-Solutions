// import MegaMenu from "../models/MegaMenu.js";

// // Get mega menu
// export const getMegaMenu = async (req, res) => {
//   try {
//     const menu = await MegaMenu.findOne();
//     if (!menu) {
//       return res.json([]);
//     }
//     const megaMenuItem = menu.menuItems.find((item) => item.megaMenu);
//     res.json(megaMenuItem ? megaMenuItem.megaMenu : []);
//   } catch (error) {
//     console.error("Error fetching mega menu:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update mega menu
// export const updateMegaMenu = async (req, res) => {
//   try {
//     const { categories } = req.body;
//     let menu = await MegaMenu.findOne();
//     if (!menu) {
//       // Create new menu with megaMenu item
//       menu = new MegaMenu({
//         menuItems: [{ megaMenu: categories }],
//       });
//     } else {
//       const megaMenuIndex = menu.menuItems.findIndex((item) => item.megaMenu);
//       if (megaMenuIndex !== -1) {
//         menu.menuItems[megaMenuIndex].megaMenu = categories;
//       } else {
//         menu.menuItems.push({ megaMenu: categories });
//       }
//       menu.updatedAt = Date.now();
//     }
//     await menu.save();
//     res.json(categories);
//   } catch (error) {
//     console.error("Error updating mega menu:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Add mega menu
// export const addMegaMenu = async (req, res) => {
//   try {
//     const { categories } = req.body;
//     const newMenu = new MegaMenu({
//       menuItems: [{ megaMenu: categories }],
//     });
//     await newMenu.save();
//     res.status(201).json(categories);
//   } catch (error) {
//     console.error("Error adding mega menu:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// controllers/megaMenuController.js


import MegaMenu from "../models/MegaMenu.js";

// Get mega menu
export const getMegaMenu = async (req, res) => {
  try {
    const menu = await MegaMenu.findOne();
    console.log("Fetched menu from DB:", menu);
    if (!menu) {
      return res.json([]);
    }
    const megaMenuItem = menu.menuItems.find((item) => item.megaMenu);
    res.json(megaMenuItem ? megaMenuItem.megaMenu : []);
  } catch (error) {
    console.error("Error fetching mega menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update mega menu
export const updateMegaMenu = async (req, res) => {
  try {
    const { categories, catIndex, itemIndex } = req.body;
    let menu = await MegaMenu.findOne();

    if (!menu) {
      menu = new MegaMenu({
        menuItems: [{ megaMenu: categories || [] }],
      });
    } else {
      const megaMenuIndex = menu.menuItems.findIndex((item) => item.megaMenu);
      let updatedMegaMenu = megaMenuIndex !== -1 ? menu.menuItems[megaMenuIndex].megaMenu : [];

      if (catIndex !== undefined && itemIndex !== undefined && categories?.length > 0) {
        // Update a specific item
        if (!updatedMegaMenu[catIndex]) updatedMegaMenu[catIndex] = { title: "", items: [] };
        updatedMegaMenu[catIndex].items[itemIndex] = categories[0];
      } else if (catIndex !== undefined && categories?.length > 0) {
        // Update an entire category
        updatedMegaMenu[catIndex] = categories[0];
      } else {
        // Replace the entire mega menu
        updatedMegaMenu = categories || [];
      }

      if (megaMenuIndex !== -1) {
        menu.menuItems[megaMenuIndex].megaMenu = updatedMegaMenu;
      } else {
        menu.menuItems.push({ megaMenu: updatedMegaMenu });
      }
      menu.updatedAt = Date.now();
    }

    await menu.save();
    const updatedMenuItem = menu.menuItems.find((item) => item.megaMenu);
    res.json(updatedMenuItem ? updatedMenuItem.megaMenu : []);
  } catch (error) {
    console.error("Error updating mega menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new category to mega menu
export const addMegaMenu = async (req, res) => {
  try {
    const { category } = req.body; // Expect a single category object
    let menu = await MegaMenu.findOne();

    if (!menu) {
      menu = new MegaMenu({
        menuItems: [{ megaMenu: [category] }],
      });
    } else {
      const megaMenuIndex = menu.menuItems.findIndex((item) => item.megaMenu);
      if (megaMenuIndex !== -1) {
        menu.menuItems[megaMenuIndex].megaMenu.push(category);
      } else {
        menu.menuItems.push({ megaMenu: [category] });
      }
    }

    await menu.save();
    console.log("Saved mega menu:", menu);
    const updatedMenuItem = menu.menuItems.find((item) => item.megaMenu);
    res.status(201).json(updatedMenuItem ? updatedMenuItem.megaMenu : []);
  } catch (error) {
    console.error("Error adding mega menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};