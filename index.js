#!/usr/bin/env node
// Import the required modules
const fs = require("fs");
const path = require("path");

// Helper function to create directories
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
};

// Helper function to create files
const createFile = (filePath, content = "") => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`File created: ${filePath}`);
  }
};

// Define the root directory and the structure of the e-commerce project
const rootDir = path.join(__dirname, "ecommerce-website");
const structure = {
  public: ["index.html", "favicon.ico"],
  src: {
    components: ["Header.js", "Footer.js", "ProductCard.js"],
    pages: ["Home.js", "ProductDetails.js", "Cart.js", "Checkout.js"],
    assets: [],
    services: ["apiService.js"],
    utils: ["formatCurrency.js"],
    hooks: ["useCart.js"],
    context: ["AuthContext.js"],
    redux: {
      actions: ["cartActions.js"],
      reducers: ["cartReducer.js"],
      store: ["store.js"],
    },
    styles: ["global.css"],
    api: [],
    "": ["index.js", "App.js"],
  },
  "": [
    ".env",
    ".gitignore",
    "webpack.config.js",
    "babel.config.js",
    "README.md",
  ],
};

// Recursive function to create directories and files based on the structure object
const createStructure = (baseDir, structure) => {
  for (const key in structure) {
    const newDir = path.join(baseDir, key);
    // If the key is an array, create files in the base directory
    if (Array.isArray(structure[key])) {
      // Create directory if not already created
      if (key !== "") createDirectory(newDir);
      structure[key].forEach((file) => createFile(path.join(newDir, file)));
    } else {
      // Otherwise, it's an object, so we create a directory and recurse
      createDirectory(newDir);
      createStructure(newDir, structure[key]);
    }
  }
};

// Start creating the structure
createDirectory(rootDir);
createStructure(rootDir, structure);

// Write content to specific files
const readmePath = path.join(rootDir, "README.md");
fs.writeFileSync(
  readmePath,
  "# E-commerce Website\nThis is a common file structure for developing an e-commerce website.\n"
);
console.log(`Content added to: ${readmePath}`);

const envPath = path.join(rootDir, ".env");
fs.writeFileSync(
  envPath,
  "NODE_ENV=development\nAPI_URL=http://localhost:3000\n"
);
console.log(`Content added to: ${envPath}`);

console.log("E-commerce project structure created successfully!");
