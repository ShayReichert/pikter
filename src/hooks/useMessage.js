import { useContext, useState, useEffect } from "react";
import FirebaseContext from "../firebase/context";

const useMessage = (message) => {
  const { user, firebase } = useContext(FirebaseContext);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (user) {
      const isLike = message.likes.some((like) => like.likeBy.id === user.uid);
      setIsLike(isLike);
    }
  }, [user, message.likes]);

  const handleLike = () => {
    setIsLike((prevIsLike) => !prevIsLike);
    const likeRef = firebase.db.collection("messages").doc(message.id);

    if (!isLike) {
      const like = { likeBy: { id: user.uid, name: user.displayName } };
      const updatedLikes = [...message.likes, like];
      likeRef.update({ likes: updatedLikes });
    } else {
      const updatedLikes = message.likes.filter(
        (like) => like.likeBy.id !== user.uid
      );
      likeRef.update({ likes: updatedLikes });
    }
  };

  const handleDeleteMessage = () => {
    const messageRef = firebase.db.collection("messages").doc(message.id);
    messageRef.delete();
  };
  return {
    user,
    isLike,
    handleLike,
    handleDeleteMessage,
  };
};

export default useMessage;
