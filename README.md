- Venmo-clone
  - This is an approach at cloning some payment platforms like Venmo or PayTM, etc.
  - It has a user facing app where you can sign up or sign in
  - It has a bank web hook handler (an express app) for handling requests from banking APIs that confirm if the payment is completed or not

- Clone the repo

```jsx
git clone https://github.com/Pritam12F/PaytmClone.git
```

- npm install
- Run postgres either locally or on the cloud (neon.tech)

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)
