export const parseTextMessage = (obj: TextMessage) => {
  const {
    message: {from, text, date, chat},
  } = obj;
  const {type, first_name: pushName} = chat;
  const {id, is_bot: isBot} = from;
};
