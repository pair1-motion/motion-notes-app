# motion-notes-app
---

CRUD App using express, postgres, sequelize, and ejs as view engine

[try app](https://motion-notes.herokuapp.com/)

Tree Project Strucutre:
```bash
.  
├── app.js  
├── config  
│ └── config.json  
├── controllers  
│ ├── board.js  
│ ├── index.js  
│ └── user.js  
├── dataseed  
│ └── boards.json  
├── helpers  
│ └── helper.js  
├── migrations  
│ ├── 20200923095846-create-user.js  
│ ├── 20200923100240-create-board.js  
│ ├── 20200923100446-create-user-board.js  
│ ├── 20200923100718-create-note.js  
│ ├── 20200923114621-add-constrain-in-usersboards.js  
│ └── 20200923124752-add-constrain-in-notes.js  
├── models  
│ ├── board.js  
│ ├── index.js  
│ ├── note.js  
│ ├── userboard.js  
│ └── user.js  
├── package.json  
├── package-lock.json  
├── Procfile  
├── README.md  
├── routers  
│ ├── boardRouter.js  
│ ├── index.js  
│ └── users.js  
├── sb.js  
├── seeders  
│ └── 20200923142135-seed-board.js  
└── views  
├── boards  
│ ├── board-edit.ejs  
│ ├── board-form.ejs  
│ ├── boards2.ejs  
│ ├── boards.ejs  
│ └── viewBoard.ejs  
├── css  
│ ├── index.ejs  
│ └── login.ejs  
├── css.ejs  
├── dashboard.ejs  
├── index.ejs  
├── login.ejs  
├── notes  
│ ├── note-edit.ejs  
│ ├── note-form.ejs  
│ └── viewNote.ejs  
├── partials  
│ ├── members.ejs  
│ ├── nav.ejs  
│ └── nav-login.ejs  
├── register.ejs  
└── setting.ejs
```





<!---
## Development - nb:
        Tambahkan Catatan disini:
- [x] Init DB
- [x] Init Table
- [x] Skeleton Code Express router dan controller
- [x] Relasi m:n (Many to Many) Table Users:Boards
    - [x] Database
    - [x] Model
- [x] Relasi n:1 (One to Many) Table Boards:Notes
    - [x] Database
    - [x] Model
- [x] CRUD
    - [x] User      -> Bagus
      - [x] Register (add)
      - [x] Login (read)
    - [x] Board     -> Hakim
    - [x] Note
- [x] EJS
    - [x] Home
    - [x] Dasboard (user id -> session)
    - [x] Board
    - [x] Notes
- [x] Router Get
    - [x] Home (login/register)
    - [x] Users
      - [x] Register / main page
      - [x] login
      - [x] Dashboard
    - [x] Board
      - [x] Add Board
    - [x] Note
      - [x] Edit Notes (or 1st edit / add)
- [x] Router Post
    - [x] Users
      - [x] Login
      - [x] Register
    - [x] Board
      - [x] Add Board
      - [x] Modify / Edit Board
    - [x] Note
      - [x] Add Notes
      - [x] Edit Notes (edit the notes)
- [x] Method
    - [x] Static Method ( wordcounter -> note )
    - [x] Instance Method ( get date created of note)
- [x] Hooks (  pw hashing )
- [x] Helper (  paragraf view note di board )
- [x] Middleware ( check login agar redirect '/' )
- [x] Session Register / Login
- [x] MVP google translate
-->
