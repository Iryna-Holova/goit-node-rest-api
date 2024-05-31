import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const msg = { ...data, from: SENDGRID_EMAIL };
    await sgMail.send(msg);
  } catch (_) {
    throw HttpError(500, "Failed to send verification email");
  }
};

export default sendEmail;
