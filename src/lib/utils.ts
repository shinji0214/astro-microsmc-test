// 日付を「2026年10月4日」の形式に整形（日本時間）
export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    dateStyle: 'long',
  }).format(new Date(date));
};
