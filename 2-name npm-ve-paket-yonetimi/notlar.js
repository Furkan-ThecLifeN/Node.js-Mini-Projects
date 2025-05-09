import fs from "fs";
import chalk from "chalk";

export function notEkle(baslik, icerik) {
  const not = `${baslik}: ${icerik}\n`;
  fs.appendFileSync("notlar.txt", not);
  console.log(chalk.green("✅ Not eklendi ") + chalk.yellow(not));
}

export function notlariListele() {
  if (!fs.existsSync("notlar.txt")) {
    console.log(chalk.red("🚫 Henüz hiç not eklenmemiş."));
    return;
  }

  const veriler = fs.readFileSync("notlar.txt", "utf-8");
  console.log(chalk.blue("\n📒 Tüm Notlar:\n"));
  console.log(chalk.white(veriler));
}
