const axios = require('axios');

const sendOTPEmail = async (email, otp, userName, purpose = 'Email Verification') => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9; border: 1px solid #ddd;">
        
        <div style="text-align: center; background-color: #030711; padding: 15px; border-radius: 8px 8px 0 0;">
          <img src="https://image2url.com/images/1766308878772-0bd91eb0-610c-4afd-b8e6-ef37c05b878d.png" alt="FinSense Logo" style="max-width: 80px;">
          <h2 style="color: #ffffff;">OTP Verification</h2>
        </div>

        <div style="background-color: #ffffff; padding: 20px; text-align: center;">
          <p>Dear <strong>${userName}</strong>,</p>
          <p>Your OTP for <strong>${purpose}</strong> is:</p>

          <div style="background-color: #f3f4f6; padding: 15px; margin-top: 10px;">
            <h2>${otp}</h2>
            <p style="color: red;">This OTP expires in 5 minutes.</p>
          </div>

          <p style="font-size: 12px; margin-top: 20px;">
            If you did not request this OTP, ignore this email.
          </p>
        </div>
      </div>
    `;

    const response = await axios.post(
      process.env.EMAIL_URL,
      {
        from: process.env.EMAIL,
        to: email,
        subject: '🔐 FinSense OTP Verification',
        html: htmlContent,
        isHtml: true
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.EMAIL_API_KEY}`
        }
      }
    );

    // ✅ Debug success response
    console.log("✅ Email sent successfully:", response.data);

    return response.data;

  } catch (error) {
    console.error("❌ Failed to send OTP Email:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }

    // ❗ VERY IMPORTANT
    throw error;
  }
};


const sendReceiptEmail = async (email, userName, amount, expiryDate) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px;">
        
        <h2 style="color: green;">Payment Successful!</h2>
        <p>Dear <strong>${userName}</strong>,</p>

        <p>₹${amount} paid successfully.</p>
        <p>Valid till: ${new Date(expiryDate).toDateString()}</p>

      </div>
    `;

    const response = await axios.post(
      process.env.EMAIL_URL,
      {
        from: process.env.EMAIL,
        to: email,
        subject: '🎉 Payment Receipt',
        html: htmlContent,
        isHtml: true
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.EMAIL_API_KEY}`
        }
      }
    );

    console.log("✅ Receipt email sent:", response.data);

    return response.data;

  } catch (error) {
    console.error("❌ Failed to send Receipt Email:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
};

module.exports = { sendOTPEmail, sendReceiptEmail };