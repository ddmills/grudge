import express from 'express';
import { client } from 'utilities/Path';

export default function createMiddleware() {
  return express.static(client());
}
