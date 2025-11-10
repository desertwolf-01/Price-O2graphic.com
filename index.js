const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// السماح لـ Express بقراءة البيانات من النماذج
app.use(express.json());
app.use(express.static('public')); // إذا كنت تضع ملفات CSS/JS في مجلد public

// تهيئة Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // أو gemini-1.5-flash

// عرض الواجهة الرئيسية
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ar">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>O2graphic | حاسبة التسعير الذكية</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f4f8; padding: 20px; text-align: center; }
            .container { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
            h1 { color: #333; }
            input, textarea, button { margin: 10px 0; padding: 12px; width: 100%; max-width: 500px; border: 1px solid #ddd; border-radius: 8px; }
            button { background: #4CAF50; color: white; border: none; cursor: pointer; font-size: 16px; }
            button:hover { background: #45a049; }
            #result { margin-top: 20px; padding: 15px; background: #e8f4e1; border-radius: 8px; display: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>حاسبة التسعير الذكية من O2graphic</h1>
            <p>اكتب تفاصيل مشروعك، وسنحسب السعر بناءً على تعقيد التصميم.</p>
            
            <form id="pricingForm">
                <input type="text" id="name" placeholder="اسمك" required>
                <textarea id="details" placeholder="اكتب تفاصيل مشروعك هنا..." required></textarea>
                <button type="submit">احسب السعر</button>
            </form>
            
            <div id="result"></div>
        </div>

        <script>
            document.getElementById('pricingForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const details = document.getElementById('details').value;
                const resultDiv = document.getElementById('result');
                
                resultDiv.style.display = 'none';
                resultDiv.innerText = '';
                
                try {
                    const response = await fetch('/api/calculate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, details })
                    });
                    
                    const data = await response.json();
                    if(response.ok) {
                      resultDiv.innerText = data.message;
                      resultDiv.style.display = 'block';
                    } else {
                      resultDiv.innerText = 'حدث خطأ: ' + data.error;
                      resultDiv.style.display = 'block';
                    }
                } catch (error) {
                    resultDiv.innerText = 'خطأ في الاتصال: ' + error.message;
                    resultDiv.style.display = 'block';
                }
            });
        </script>
    </body>
    </html>
  `);
});

// نقطة نهاية API لحساب السعر
app.post('/api/calculate', async (req, res) => {
  try {
    const { name, details } = req.body;

    // استعلام ذكي إلى Gemini
    const prompt = `أنت مساعد في شركة تصميم تُسمى O2graphic. مهمتك حساب سعر تصميم إعلان أو هوية بصرية بناءً على وصف العميل.
    العميل يُسمى: ${name}
    تفاصيل المشروع: ${details}
    أجب بجملة واحدة تحدد فيها السعر التقريبي بالدولار الأمريكي.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ message: text });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({ error: "فشل في حساب السعر. حاول لاحقًا." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
