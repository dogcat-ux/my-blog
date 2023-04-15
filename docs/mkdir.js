const fs = require("fs");
const path = require("path");
var ans = [];
async function readDir(pathUrl) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathUrl, (err, fileName) => {
      if (err) {
        reject(err);
      } else {
        const path = [];
        fileName.forEach((v) => {
          path.push(`${pathUrl}/${v}`);
        });
        resolve(path);
        // for (let i = 0; i < fileName.length; i++) {
        //   let filename = fileName[i].toString().replace(/\s*/g, "");
        //   if (filename.indexOf(".") > 5) {
        //     filename = filename.replace(
        //       /^[0-9]+/,
        //       function (match, pos, orginText) {
        //         return match + ".";
        //       }
        //     );
        //   }
        //   let name = filename.split(".md")[0];
        //   let oldPath = pathUrl + "/" + fileName[i];
        //   let newPath = pathUrl + "/" + filename;
        //   fs.renameSync(oldPath, newPath, function (err) {
        //     if (!err) {
        //     }
        //   });
        //   //	let str = `* [${name}](interview/${pathName}/${fileName[i]}) `;
        //   let str = `"/${pathName}/${fileName[i]}",`;
        //   ans.push(str);
        // }
      }
      // const path = [];
      // for (const item of ans) {
      //   path.push(`${item}`);
      // }
      // resolve(path);
    });
  });
}
async function readDirAndMakePath(pathUrl, pathName) {
  const pathArr = await readDir(pathUrl);
  const readArrDir = async (path) => {
    if (path.length <= 0) return [];
    const data = [];
    for (let i = 0; i < path.length; i++) {
      const v = path[i];
      const chunks = v.split("/");
      if (chunks[chunks.length - 1].indexOf(".") === -1) {
        const secondPath = await readDir(v);
        const tempData = await readArrDir(secondPath);
        data.push(...tempData);
      } else {
        data.push(v);
      }
    }
    return data;
  };
  const data = await readArrDir(pathArr);
  return data.map((v) => v.replace(pathUrl, `./${pathName}`));
}
async function writeDir(pathUrl, data, opt = {}) {
  fs.writeFile(pathUrl, data, opt, (err) => {
    if (err) {
      console.error(err);
    }
    // console.log("====================================");
    // console.log("目录生成成功");
    // console.log("====================================");
  });
}
async function mkdir(sidebarDir, prefix) {
  const dirArr = await readDirAndMakePath("./docs/docs", prefix);
  // 生成侧边栏格式
  // * 文件夹名称
  //  * [文章名](文章路径)
  //  * 二级文件夹名称
  //    * [二级文章名](二级文章路径)
  const data = dirArr.reduce((pre, cur) => {
    const chunks = cur.replace(prefix, "").split("/");
    const res = [];
    let resStr = "";
    chunks.forEach((v) => {
      if (v && v.indexOf(".") === -1) {
        res.push(`* ${v}`);
      } else if (v && v !== ".") {
        res.push(`* [${v.split(".")[0]}](${cur.replace("./", "")})`);
      }
    });
    res.forEach((v, index) => {
      let breakStr = "";
      let i = index;
      while (i--) {
        breakStr += "  ";
      }
      resStr += breakStr + v + "\n";
    });
    return pre + "\n" + resStr;
  }, "");
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  writeDir(sidebarDir, data);
  return data;
}
mkdir("./docs/_sidebar.md", "docs").then((data) => {});
