const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

/* =========================================================
   ABN SVG → PNG CONVERTER
   Input  : *.svg
   Output : *.png
   Location: SAME FOLDER
   ========================================================= */

const inputDir = __dirname;

const WIDTH = 1600;
const HEIGHT = 900;

console.log("💧 ABN Animated SVG");
console.log("🌱 Vol.6 — Agriculture & AgTech");
console.log("🚰 Irrigation Water Management");
console.log("----------------------------------------");
console.log("📂 Folder:", inputDir);
console.log(`📐 Output: ${WIDTH} × ${HEIGHT} px`);
console.log("📦 Format: SVG → PNG");
console.log("----------------------------------------");

/* =========================================================
   CHECK FOLDER
   ========================================================= */

if (!fs.existsSync(inputDir)) {
  console.error("❌ Folder tidak ditemukan:");
  console.error(inputDir);
  process.exit(1);
}

/* =========================================================
   FIND ALL SVG
   ========================================================= */

const files = fs
  .readdirSync(inputDir)
  .filter((file) => /\.svg$/i.test(file))
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  console.error("❌ Tidak ada file SVG ditemukan.");
  process.exit(1);
}

console.log(`🔎 SVG ditemukan: ${files.length}`);

/* =========================================================
   CONVERT ALL SVG → PNG
   ========================================================= */

async function convertAll() {
  let success = 0;
  let failed = 0;

  for (const file of files) {
    const input = path.join(inputDir, file);

    const output = path.join(inputDir, file.replace(/\.svg$/i, ".png"));

    console.log("\n----------------------------------------");
    console.log(`📥 SVG : ${file}`);
    console.log(`📤 PNG : ${path.basename(output)}`);

    /* =====================================================
       CHECK INPUT
       ===================================================== */

    if (!fs.existsSync(input)) {
      console.error("❌ SVG tidak ditemukan:");
      console.error(input);

      failed++;
      continue;
    }

    /* =====================================================
       CONVERT
       ===================================================== */

    try {
      await sharp(input)
        .resize(WIDTH, HEIGHT, {
          fit: "fill",
        })
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(output);

      console.log("✅ PNG berhasil dibuat");
      console.log(`📐 ${WIDTH} × ${HEIGHT} px`);
      console.log(`📍 ${output}`);

      success++;
    } catch (err) {
      console.error("❌ Gagal convert:");
      console.error(err.message);

      failed++;
    }
  }

  /* =======================================================
     SUMMARY
     ======================================================= */

  console.log("\n========================================");
  console.log("🏁 CONVERSION COMPLETE");
  console.log("========================================");
  console.log(`✅ Berhasil : ${success}`);
  console.log(`❌ Gagal    : ${failed}`);
  console.log(`📦 Total    : ${files.length}`);
  console.log(`📐 Size     : ${WIDTH} × ${HEIGHT} px`);
  console.log("📂 Location : SAME FOLDER");
  console.log("========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

/* =========================================================
   RUN
   ========================================================= */

convertAll();

//node convert-svg-to-png.cjs
