import { createClient } from 'microcms-js-sdk';
import type { MicroCMSContentId, MicroCMSDate, MicroCMSImage, MicroCMSQueries } from 'microcms-js-sdk';

// タグの型定義
export type Tag = {
  name?: string;
} & MicroCMSContentId &
  MicroCMSDate;

// ライターの型定義
export type Writer = {
  name?: string;
  profile?: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

// ブログの型定義
export type Blog = {
  title?: string;
  description?: string;
  content?: string;
  thumbnail?: MicroCMSImage;
  tags: Tag[];
  writer: Writer | null;
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!apiKey) {
  throw new Error('MICROCMS_API_KEY is required');
}

// retry: true で、通信エラー時に自動で再試行する
export const client = createClient({
  serviceDomain,
  apiKey,
  retry: true,
});

// ブログを全件取得（ビルド時に全ページを生成するため）
export const getAllArticles = async (queries?: MicroCMSQueries) => {
  return await client.getAllContents<Blog>({
    endpoint: 'blog',
    queries: { orders: '-publishedAt', ...queries },
  });
};
