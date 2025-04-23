import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../store/messagesSlice.js';
import { sendMessageRequest } from '../utils/requests.js';
import filter from '../utils/profany.js';

const MessageForm = ({ inputRef }) => {
  const [text, setText] = useState('');
  const channelId = useSelector(state => state.channels.currentChannelId);
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: filter(text),
      channelId,
      username,
    };
    sendMessageRequest(newMessage) // promise
      .then((response) => {
        dispatch(addMessage(response.data));
        setText('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2" onSubmit={e => handleSubmit(e)}>
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label={t('newMessage')}
            placeholder={t('enterYourMessage')}
            className="border-0 p-0 ps-2 form-control outline-secondary"
            value={text}
            onChange={e => handleChange(e)}
            ref={inputRef}
          />
          <button
            type="submit"
            disabled=""
            className="btn btn-group-vertical btn-outline-secondary"
          >
            {'=>'}
            <span className="sr-only form-label">{t('send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
