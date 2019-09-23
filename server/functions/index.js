const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getJokes, getJoke, addJoke, deleteJoke } = require('./handlers/jokes');
const { likeJoke, unlikeJoke } = require('./handlers/likes');

const {
  getCommentReplies,
  commentOnJoke,
  deleteComment,
  replyOnComment,
  deleteCommentReply,
} = require('./handlers/comments');

const {
  login,
  signup,
  getUserOwnData,
  addUserDetails,
  uploadUserAvatar,
} = require('./handlers/users');

const {
  createNotificationOnLike,
  deleteNotificationOnUnLike,
  createNotificationOnComment,
  deleteNotificationOnCommentDelete,
} = require('./triggers/notifications');

//  joke routes
app.get('/jokes', getJokes);
app.get('/joke/:jokeId', getJoke);
app.post('/joke', fbAuth, addJoke);
app.delete('/joke/:jokeId', fbAuth, deleteJoke);
//TODO: delete a joke route (also delete all related comments and replies and likes from the db)
//TODO: edit a joke route

// Comment routes
app.post('/joke/:jokeId/comment', fbAuth, commentOnJoke);
app.delete('/joke/:jokeId/comment/:commentId', fbAuth, deleteComment);

// Comment reply routes
app.get('/joke/:jokeId/comment/:commentId/replies', getCommentReplies);
app.post('/joke/:jokeId/comment/:commentId/reply', fbAuth, replyOnComment);
app.delete(
  '/joke/:jokeId/comment/:commentId/reply/:replyId',
  fbAuth,
  deleteCommentReply
);

app.post('/joke/:jokeId/like', fbAuth, likeJoke);
app.post('/joke/:jokeId/unlike', fbAuth, unlikeJoke);

// users routes
app.post('/signup', signup);
app.get('/login', login);
//TODO: add login options with google and facebook

app.get('/user', fbAuth, getUserOwnData);
app.post('/user', fbAuth, addUserDetails);
app.post('/user/image', fbAuth, uploadUserAvatar);

// DB triggers
exports.createNotificationOnLike = createNotificationOnLike;
exports.deleteNotificationOnUnLike = deleteNotificationOnUnLike;
exports.createNotificationOnComment = createNotificationOnComment;
exports.deleteNotificationOnCommentDelete = deleteNotificationOnCommentDelete;

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);
