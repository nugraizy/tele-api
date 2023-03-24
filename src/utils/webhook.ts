import axios from 'axios';

export const setupWebhook = async (
  WEBHOOK_URL: string,
  TELEGRAM_TOKEN: string
): Promise<{
  ok: boolean;
  result: boolean;
  description: string;
}> => {
  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
  const URI = `/webhook/${TELEGRAM_TOKEN}`;
  const webhookURL = `${WEBHOOK_URL}${URI}`;
  try {
    const {data} = await axios.get(
      `${TELEGRAM_API}/setWebhook?url=${webhookURL}&drop_pending_updates=true&allowed_updates=[update_id,message,edited_message,poll,poll,chat_member,my_chat_member]`
    );
    return data;
  } catch (error: any) {
    return {
      ok: true,
      result: true,
      description: error.message,
    };
  }
};
