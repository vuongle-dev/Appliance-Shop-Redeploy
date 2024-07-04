import axios from "axios";
import child from "child_process";
import express from "express";
import md5 from "md5";
import util from "util";

const exec = util.promisify(child.exec);

const redployRouter = express.Router();

const redeployData = (projectName: string) => {
  const d = new Date();
  let now_time = d.getTime();
  const form = new FormData();
  form.append(
    "request_token",
    md5(now_time + "" + md5(process.env.BT_KEY || ""))
  );
  form.append("request_time", now_time.toString());
  form.append("data", `{"project_name":"${projectName}"}`);
  return form;
};

const nodejsRestartUrl = process.env.RESTART_URL;

redployRouter.get("/api", async (req: any, res: any, next: any) => {
  try {
    const result = await exec("sh redeploy.sh");
    console.log(result.stdout);
    if (result.stderr.length > 0)
      return res
        .status(500)
        .json({ error: "Redeploy Error", errors: result.stderr });
    console.log("Restarting api project");
    await axios.post(nodejsRestartUrl, redeployData("appliance_shop_api"), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Restarted");
    res.json({ message: "Redeploy success" });
  } catch (error: any) {
    res.status(500).json({ error: "Restart Project error", errors: error });
  }
});
redployRouter.post("/api", async (req: any, res: any, next: any) => {
  try {
    const result = await exec("sh redeploy.sh");
    console.log(result.stdout);
    if (result.stderr.length > 0)
      return res
        .status(500)
        .json({ error: "Redeploy Error", errors: result.stderr });
    console.log("Restarting api project");
    await axios.post(nodejsRestartUrl, redeployData("appliance_shop_api"), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Restarted");
    res.json({ message: "Redeploy success" });
  } catch (error: any) {
    res.status(500).json({ error: "Restart Project error", errors: error });
  }
});
redployRouter.get("/user", async (req: any, res: any, next: any) => {
  try {
    const result = await exec("sh redeploy-user.sh");
    console.log(result.stdout);
    if (result.stderr.length > 0)
      return res
        .status(500)
        .json({ error: "Redeploy Error", errors: result.stderr });
    console.log("Restarting user project");
    axios.post(nodejsRestartUrl, redeployData("appliance_shop_user"), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Restarted");
    res.json({ message: "Redeploy success" });
  } catch (error: any) {
    res.status(500).json({ error: "Restart Project error", errors: error });
  }
});
redployRouter.post("/user", async (req: any, res: any, next: any) => {
  try {
    const result = await exec("sh redeploy-user.sh");
    console.log(result.stdout);
    if (result.stderr.length > 0)
      return res
        .status(500)
        .json({ error: "Redeploy Error", errors: result.stderr });
    console.log("Restarting user project");
    axios.post(nodejsRestartUrl, redeployData("appliance_shop_user"), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Restarted");
    res.json({ message: "Redeploy success" });
  } catch (error: any) {
    res.status(500).json({ error: "Restart Project error", errors: error });
  }
});
redployRouter.get("/admin", async (req: any, res: any, next: any) => {
  try {
    const result = await exec("sh redeploy-admin.sh");
    console.log(result.stdout);
    if (result.stderr.length > 0)
      return res
        .status(500)
        .json({ error: "Redeploy Error", errors: result.stderr });
    return res.json({ message: "Redeploy success" });
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error", errors: error });
  }
});
redployRouter.post("/admin", async (req: any, res: any, next: any) => {
  try {
    const result = await exec("sh redeploy-admin.sh");
    console.log(result.stdout);
    if (result.stderr.length > 0)
      return res
        .status(500)
        .json({ error: "Redeploy Error", errors: result.stderr });
    return res.json({ message: "Redeploy success" });
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error", errors: error });
  }
});

export default redployRouter;
