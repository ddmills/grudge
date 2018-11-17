import express from 'express';
import { staticAsset as getStaticAssetPath } from 'utilities/Path';

export default function createMiddleware() {
  return express.static(getStaticAssetPath());
}
