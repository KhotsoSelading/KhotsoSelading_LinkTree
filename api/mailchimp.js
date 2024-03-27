import fetch from "node-fetch";

export default async function handler(req, res) {
  const MAILCHIMP_API_KEY = "75fd9a07129e29de06a1668053c5b906-us22";
  const DC = "us22";
  const AUDIENCE_ID = "7f095362bc";
  const baseUrl = `https://${DC}.api.mailchimp.com/3.0`;
  console.log("hello from cloud function");

  const subscriberData = JSON.parse(req.body);

  try {
    const memberData = {
      email_address: subscriberData.email,
      status: "pending",
      merge_fields: {
        FNAME: subscriberData.firstName,
      },
    };

    const mailchimpRes = await fetch(
      `${baseUrl}/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify(memberData),
      }
    );

    const data = await mailchimpRes.json();

    if (!mailchimpRes.ok) {
      throw new Error(data.title);
    }

    console.log(data);

    res.send({ message: "success" });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(400).send({ message: error.message });
  }
}
