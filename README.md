# Fily

A file storage app (Google Drive clone) built using React.

# About

I built a full authentication system using sessions and OAuth from Facebook, Google, and Twitter. Additionally, I implemented email authentication using a link that has a JWT token that gets sent to the user's email using an SMTP server.

Users can upload and download files to their account and preview them directly in the browser. Most importantly, this is done securely by making a temporary link to every file the user requests.

Also, the user can create folders and group files in them and share the folders publicly with people using a link.

# The Design

You can check the full UI design over at Figma [HERE](https://www.figma.com/file/0ZqSOqUBesnbZ9YhiDRVw6/fily?type=design&node-id=0%3A1&t=UFBocSbjcxMqfgkN-1).

# The Stack

## Frontend

- Figma
- React
- Material UI
- Axios
- Zustand (state management)

## Backend

- Node.js
- Express
- JWT
- OAuth
- Sequelize
- PostgreSQL

## Deploy

- Firebase
- Github Actions
- Docker
- Render

## **Installation**

### React

```
cd Frontend
npm i
npm start

```

### Express

```
cd Backend
npm i
npm run dev

```

## License

MIT