const express = require("express");
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');
const cookieParser = require("cookie-parser");
 const database = require("./config/database");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 4000;

database.connect();

app.use(cookieParser());
app.use(express.json());

app.use(
    cors({
        origin:"http://localhost:3000", 
        credentials:true
    })
);
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)


cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);


app.get("/", (req, res) => {
    return res.json({
        success:true,
        message: 'Your server is up and running.......'
    })
})



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})