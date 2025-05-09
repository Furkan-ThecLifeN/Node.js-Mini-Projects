import { notEkle, notlariListele } from "./notlar.js";

const komut = process.argv[2];
const baslik = process.argv[3];
const icerik = process.argv[4];

if (komut === "ekle") {
  notEkle(baslik, icerik);
} else if (komut === "listele") {
  notlariListele();
} else {
  console.log("Kullanım: node index.js [ekle|listele] başlık içerik");
}
