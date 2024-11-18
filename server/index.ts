// const express = require('express');
import express, { Express } from 'express';
import dotenv from 'dotenv';
import handlers from './src/handlers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/');

app.listen(port, () => {
  console.log(`[INFO]: Server is running at http://localhost:${port}`);
});
