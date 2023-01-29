import { useQuery } from "react-query"
import { request } from "../../../tools/axiosUtils"

const changeDepositStatusRequest = ({ queryKey }) => {
  let body: any = {
    id: queryKey[1],
    otcOperationStatus: queryKey[2],
    userChange: true,
  }
  if (queryKey[3] !== null) body.canceledReason = queryKey[3]
  return request({ url: `/buyBalance/changeOperationStatus`, method: 'post', data: body })
}

export const changeDepositStatus = (
  id: string | null,
  otcOperationStatus: string | null,
  canceledReason: string | null,
) => {
  return useQuery(
    ['changeDepositStatusRequest', id, otcOperationStatus, canceledReason],
    changeDepositStatusRequest,
    {
      enabled: false,
      select: (data) => data?.data,
      onSuccess: (data) => {
        console.log('data', JSON.stringify(data, null, 4));
      }
      //keepPreviousData: true
    }
  )
}
