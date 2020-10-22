import React from "react";
import {
  FiHeart,
  FiX,
  FiMessageCircle,
  FiUpload,
  FiRefreshCw,
} from "react-icons/fi";
import useMessage from "../hooks/useMessage";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import IconContainer from "./IconContainer";

const Message = ({ message }) => {
  const { user, isLike, handleLike, handleDeleteMessage } = useMessage(message);

  const isOwner = user && user.uid === message.postedBy.id;

  return (
    <div className="message-container">
      <div>
        <img className="profil-picture" src={message.photo} alt="Shay" />
      </div>
      <div className="message">
        <header>
          <h3>{message.postedBy.name}</h3>
          <span>. {formatDistanceToNow(message.createAt, { locale: fr })}</span>
        </header>
        <p>{message.message}</p>
        {user && (
          <footer>
            <IconContainer color="blue">
              <FiMessageCircle />
            </IconContainer>
            <IconContainer color="green">
              <FiRefreshCw />
            </IconContainer>
            <IconContainer
              onClick={handleLike}
              color="red"
              count={message.likes.length}
              isLike={isLike}
            >
              <FiHeart />
            </IconContainer>
            <IconContainer color="blue">
              <FiUpload />
            </IconContainer>
            {isOwner && (
              <IconContainer onClick={handleDeleteMessage} color="red">
                <FiX />
              </IconContainer>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Message;
