const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

app.use(cors());
// postリクエストで投稿されたデータを解析する
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const connectDB = require("./utils/database");
const auth = require("./utils/auth");
const { ItemModel, UserModel } = require("./utils/schemaModels");

// ITEM functions
// Create Item
app.post("/item/create", auth, async (req, res) => {
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message: "アイテム作成成功" });
  } catch (err) {
    return res.status(400).json({ message: "アイテム作成失敗" });
  }
});

// Read All Items
app.get("/", async (req, res) => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "アイテム読み取り成功(All)", allItems: allItems });
  } catch (err) {
    return res.status(400).json({ message: "アイテム読み取り成功(失敗)" });
  }
});

// Read Item Single Item
app.get("/item/:id", async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    return res.status(200).json({
      message: "アイテム読み取り成功(Single)",
      singleItem: singleItem,
    });
  } catch (err) {
    return res.status(400).json({ message: "アイテム読み取り失敗(Single)" });
  }
});

// Update Item
app.put("/item/update/:id", auth, async (req, res) => {
  try {
    await connectDB();
    const signleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email !== req.body.email) {
      await ItemModel.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({ message: "アイテム更新成功" });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: "アイテム更新失敗" });
  }
});

// Delete Item
app.delete("/item/delete/:id", auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email !== req.body.email) {
      await ItemModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "アイテム削除成功" });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: "アイテム削除失敗" });
  }
});

// USER functions
// Register User
app.post("/user/register", async (req, res) => {
  try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({ message: "ユーザー登録成功" });
  } catch (err) {
    return res.status(400).json({ message: "ユーザー登録失敗" });
  }
});

// Login User
const secret_key = "mern-market";
app.post("/user/login", async (req, res) => {
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: req.body.email });
    if (savedUserData) {
      if (req.body.password === savedUserData.password) {
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
        console.log(token);
        return res.status(200).json({ message: "ユーザーログイン成功" });
      } else {
        return res
          .status(400)
          .json({ message: "ユーザーログイン失敗:パスワードが間違っています" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "ユーザーログイン失敗:ユーザー登録してください" });
    }
  } catch (err) {
    return res.status(400).json({ message: "ユーザーログイン失敗" });
  }
});

// Connect to port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
