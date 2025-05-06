
// selam.js
module.exports = function () {
  console.log("Selam, dünya!");
};

// app.js
const selamVer = require("./selam");
selamVer();

// fs (File System): Dosya işlemleri
const fs = require("fs");

// dosya oluştur
fs.writeFileSync("deneme.txt", "Merhaba Dosya");

// dosya oku
const veri = fs.readFileSync("deneme.txt", "utf-8");
console.log(veri);


// path: Dosya yollarını işler
const path = require("path");
const dosyaYolu = path.join(__dirname, "dosyalar", "metin.txt");
console.log(dosyaYolu);

// os: Sistem bilgileri
const os = require('os');
console.log(os.platform());
console.log(os.totalmem());

// process: Argümanlar ve ortam bilgisi
console.log(process.argv); // node app.js merhaba



/* Simple Project */

const fs = require("fs");
const process = require("process");

const komut = process.argv[2];
const dosyaAdı = process.argv[3];
const içerik = process.argv[4];

if (komut === "olustur") {
  fs.writeFileSync(dosyaAdı, içerik || "");
  console.log(`${dosyaAdı} oluşturuldu.`);
} else if (komut === "oku") {
  const veri = fs.readFileSync(dosyaAdı, "utf-8");
  console.log(veri);
} else if (komut === "sil") {
  fs.unlinkSync(dosyaAdı);
  console.log(`${dosyaAdı} Silindi.`);
} else {
  console.log("Kullanım: node index.js [olustur|oku|sil] dosyaAdı [içerik]");
}
