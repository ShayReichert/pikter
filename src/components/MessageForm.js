import React from "react";

const MessageForm = ({
  handleSubmit,
  handleKeyPress,
  handleChange,
  values,
  errors,
  user,
}) => {
  return (
    <form onSubmit={handleSubmit} className="message-form-container">
      <div className="message-form">
        <div>
          <img className="profil-picture" src={user.photoURL} alt="Shay" />
        </div>
        <textarea
          onKeyDown={handleKeyPress}
          onChange={handleChange}
          name="message"
          value={values.message}
          placeholder="What's up, Pikeur ?"
        />
      </div>
      {errors.message && <p className="error-text">{errors.message}</p>}
      <footer>
        <p>{280 - values.message.length}</p>
        <button
          type="submit"
          disabled={values.message.length > 280 || values.message.length === 0}
        >
          Peekter
        </button>
      </footer>
    </form>
  );
};

export default MessageForm;
