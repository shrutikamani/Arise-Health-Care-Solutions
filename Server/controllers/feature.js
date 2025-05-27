import Feature from "../models/Feature.js";

export const createFeature = async (req, res) => {
  try {
    const { title, description, imgUrls } = req.body;
    const errors = [];

    if (!title || title.trim().length < 5) errors.push("Title must be at least 5 characters.");
    if (!description || description.trim().length < 10) errors.push("Description must be at least 10 characters.");

    let images = [];

    if (req.files && req.files.images) {
      const uploaded = req.files.images.map(file => `/uploads/${file.filename}`);
      images.push(...uploaded);
    }

    if (imgUrls) {
      let urls = Array.isArray(imgUrls) ? imgUrls : imgUrls.split(',').map(u => u.trim());

      urls.forEach(url => {
        if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)) {
          errors.push(`Invalid image URL: ${url}`);
        } else {
          images.push(url);
        }
      });
    }

    if (images.length === 0) errors.push("At least one image is required.");
    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    const feature = new Feature({ title: title.trim(), description: description.trim(), images });
    await feature.save();

    res.status(201).json({ success: true, message: "Feature created", data: feature });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getAllFeatures = async (req, res) => {
//   try {
//     const features = await Feature.find().sort({ createdAt: -1 });
//     res.status(200).json(features);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: features
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) return res.status(404).json({ message: "Feature not found" });
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const updateFeature = async (req, res) => {
//   try {
//     const { title, description, imgUrls } = req.body;
//     const errors = [];

//     let images = [];

//     if (req.files && req.files.images) {
//       const uploaded = req.files.images.map(file => `/uploads/${file.filename}`);
//       images.push(...uploaded);
//     }

//     if (imgUrls) {
//       let urls = Array.isArray(imgUrls) ? imgUrls : imgUrls.split(',').map(u => u.trim());

//       urls.forEach(url => {
//         if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)) {
//           errors.push(`Invalid image URL: ${url}`);
//         } else {
//           images.push(url);
//         }
//       });
//     }

//     if (errors.length > 0) return res.status(400).json({ success: false, errors });

// const updatedFeature = await Feature.findByIdAndUpdate(
//       req.params.id,
//       { title, description, images },
//       { new: true }
//   );

//   if (!updatedFeature) return res.status(404).json({ message: "Feature not found" });
//   res.status(200).json({ success: true, message: "Feature updated", data: updatedFeature });
// } catch (error) {
//   res.status(400).json({ error: error.message });
//   }
// };

export const updateFeature = async (req, res) => {
  try {
    const { title, description, imgUrls } = req.body;
    const errors = [];

    // Fetch the existing feature to preserve its images if needed
    const existingFeature = await Feature.findById(req.params.id);
    if (!existingFeature) {
      return res.status(404).json({ success: false, message: "Feature not found" });
    }

    let images = [...existingFeature.images]; // Start with current images

    // If new files are uploaded, replace the image list with them
    if (req.files && req.files.images && req.files.images.length > 0) {
      const uploaded = req.files.images.map(file => `/uploads/${file.filename}`);
      images = uploaded; // Replace old images with new ones
    }

    // If imgUrls are passed (external URLs), add or replace accordingly
    if (imgUrls) {
      const urls = Array.isArray(imgUrls)
        ? imgUrls
        : imgUrls.split(',').map(u => u.trim());

      urls.forEach(url => {
        if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)) {
          errors.push(`Invalid image URL: ${url}`);
        }
      });

      if (urls.length > 0 && errors.length === 0) {
        images = urls; // You can choose to append or replace depending on your logic
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Update the feature
    const updatedFeature = await Feature.findByIdAndUpdate(
      req.params.id,
      { title, description, images },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Feature updated", data: updatedFeature });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);
    if (!feature) return res.status(404).json({ message: "Feature not found" });
    res.status(200).json({ message: "Feature deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};