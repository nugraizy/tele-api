import {parseQuoted} from './quoted-messages.js';

export const parsePollMessage = (obj: PollMessage) => {
  const {
    message: {from, poll, date, chat, message_id},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const pollMessage = {
    id: poll.id,
    question: poll.question,
    votePoll: poll.options.map(options => ({
      pollTitle: options.text,
      totalVote: options.voter_count,
    })),
    totalVoter: poll.total_voter_count,
    isEnded: poll.is_closed,
    isAnonymously: poll.is_anonymous,
    type: poll.type,
    isMultiAnswersAllowed: poll.allows_multiple_answers,
    correctAnswerId: poll.correct_option_id,
    explanation: poll.explanation,
  };

  const message = {
    date,
    senderName,
    chatName,
    isBot,

    key: {
      id: update_id,
      participant: fromId,
      from: chatId,
      type,
      isGroup: type === 'group' || type === 'supergroup',
      groupSubject: title ? title : null,
    },
    message: {
      pollMessage,
      id: message_id,
    },
  };

  if (obj.message.reply_to_message) {
    Object.assign(message.message, {
      contextInfo: {
        quotedMessage: parseQuoted(obj.message.reply_to_message, update_id),
      },
    });
  }

  return {
    ...message,
  } as PollMessageInfo;
};
