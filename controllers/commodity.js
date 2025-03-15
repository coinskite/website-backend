const Commodity = require("../models/commodity")

async function getAllCommodities(req, res) {
  try {
    const filters = {}

    if (req.query.state) filters.state = req.query.state
    if (req.query.district) filters.district = req.query.district
    if (req.query.market) filters.market = req.query.market
    if (req.query.variety) filters.variety = req.query.variety
    if (req.query.commodity) filters.commodity = req.query.commodity

    const commodities = await Commodity.find(filters).sort({ arrivalDate: -1 })
    res.json(commodities)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function getCommodityById(req, res) {
  try {
    const commodity = await Commodity.findById(req.params.id)
    if (!commodity) return res.status(404).json({ message: "Commodity not found" })
    res.json(commodity)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function createCommodity(req, res) {
  try {
    const newCommodity = new Commodity(req.body)
    await newCommodity.save()
    res.status(201).json({ message: "Commotidy created successfully" })

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// router.post("/bulk", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     let commodities = [];

//     if (req.file.mimetype === "application/json") {
//       // JSON File Handling
//       const jsonData = fs.readFileSync(filePath, "utf8");
//       commodities = JSON.parse(jsonData);
//     } else if (req.file.mimetype === "text/csv") {
//       // CSV File Handling
//       const csvData = [];
//       fs.createReadStream(filePath)
//         .pipe(csv())
//         .on("data", (row) => csvData.push(row))
//         .on("end", async () => {
//           await Commodity.insertMany(csvData);
//           fs.unlinkSync(filePath); // Delete uploaded file
//           res.status(201).json({ message: "CSV data uploaded successfully" });
//         });
//       return;
//     } else if (
//       req.file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     ) {
//       // Excel File Handling
//       const workbook = xlsx.readFile(filePath);
//       const sheetName = workbook.SheetNames[0];
//       const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
//       commodities = excelData;
//     } else {
//       return res.status(400).json({ message: "Invalid file format" });
//     }

//     // Save to MongoDB
//     await Commodity.insertMany(commodities);
//     fs.unlinkSync(filePath); // Delete uploaded file
//     res.status(201).json({ message: "Bulk commodities uploaded successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// })

async function updateCommodity(req, res) {
  try {
    const updatedCommodity = await Commodity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedCommodity) return res.status(404).json({ message: "Commodity not found" })
    res.json({ message: "Commotidy updated successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function deleteCommodity(req, res) {
  try {
    const deletedCommodity = await Commodity.findByIdAndDelete(req.params.id)
    if (!deletedCommodity) return res.status(404).json({ message: "Commodity not found" })
    res.json({ message: "Commodity deleted" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getAllCommodities,
  getCommodityById,
  createCommodity,
  updateCommodity,
  deleteCommodity,
}
