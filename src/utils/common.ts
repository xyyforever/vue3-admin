const fmt = (v:any) => v < 10 ? `0${v}` : v

export const getNow = () => {
  const now = new Date()
  return `
  ${now.getFullYear()}年${fmt(now.getMonth() + 1)}月${fmt(now.getDate())}日  ${fmt(now.getHours())}:${fmt(now.getMinutes())}:${fmt(now.getSeconds())}
  `
}
