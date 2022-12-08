
export const formatIdCardNo = (idCardNo: string): string => {

  return idCardNo.slice(0, 3) + "-" + idCardNo.slice(3, 10) + "-" + idCardNo[10];
}
