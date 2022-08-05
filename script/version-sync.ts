import fs from "fs/promises";
import path from "path";
import rootPkg from "../package.json";

const packagesPath = path.join(__dirname, "..", "packages");

async function main() {
  const files = await fs.readdir(packagesPath);
  await Promise.all(
    files.map(async name => {
      const pkgPath = path.join(packagesPath, name, "package.json");
      const stat = await fs.stat(pkgPath);
      if (!stat.isFile()) {
        process.exit(1);
      }
      const content = await fs.readFile(pkgPath, "utf-8");
      const contentJson = JSON.parse(content);
      contentJson.version = rootPkg.version;
      await fs.writeFile(pkgPath, JSON.stringify(contentJson, null, 2));
    }),
  );
  const { execa } = await import("execa");
  await execa("git", ["add", "-A"]);
  await execa("git", ["commit", "-m", "feat: release"]);
  await execa("git", ["tag"]);
  await execa("git", ["push"]);
  console.log(
    `\n> ${files.length} packages synchronized, version: ${rootPkg.version}`,
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
