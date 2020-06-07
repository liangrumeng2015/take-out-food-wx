// 封装的toast提示
export const Toast = (msg, icon) => {
  return uni.showToast({
    title: msg,
    icon: icon ? icon : 'none'
  })
}
