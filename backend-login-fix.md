# Backend login fix

If login fails for a registered user, do these two things:

## 1. Set JWT_SECRET in .env

If `JWT_SECRET` is missing, `jwt.sign()` throws and the server returns 500 "Login failed".

In your backend folder, create or edit `.env`:

```
JWT_SECRET=your-secret-key-at-least-32-chars
MONGODB_URI=your-mongodb-connection-string
```

Restart the server after changing `.env`.

## 2. Return `user` in the login response

So the frontend can show the user's name. In your login route, change the success response to:

```js
res.status(200).json({
  success: true,
  message: `Hello ${user.fullName}, welcome back!`,
  token,
  user: { fullName: user.fullName, email: user.email },
});
```
