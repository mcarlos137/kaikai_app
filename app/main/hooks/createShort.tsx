import { useMutation, useQueryClient } from "react-query"
import { request } from "../../tools/axiosUtils"

type CreateShortRequest_Props = {
  userName: string
  name: string
  title: string
  description: string
  video: any
  publishTimestamp: string | null
}

const createShortRequest = ({
  userName,
  name,
  title,
  description,
  video,
  publishTimestamp
}: CreateShortRequest_Props) => {
  const formData = new FormData();
  formData.append('userName', userName);
  formData.append('name', name);
  formData.append('title', title);
  formData.append('description', description);
  if(publishTimestamp !== null) formData.append('publishTimestamp', publishTimestamp)
  if (video !== null) {
    let type = video.type.split("/")[1];
    formData.append(
      'video',
      {
        uri: video.uri,
        name: video.fileName + 'Video.' + type,
        type: video.type,
      },
      video.fileName
    );
    formData.append('videoFileName', video.fileName);
  }
  console.log('formData ' + JSON.stringify(formData));
  return request({ url: `/shortsCreate`, method: 'post', data: formData, form: true })
}

export const createShort = () => {
  const queryClient = useQueryClient()
  return useMutation(
    createShortRequest,
    {
      onMutate: async (newShort) => {
        await queryClient.cancelQueries('shorts')
        const previousShorts = queryClient.getQueryData('shorts')
        queryClient.setQueriesData('shorts', (oldQueryData: any) => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data.length + 1, ...newShort }
            ]
          }
        })
        return {
          previousShorts
        }
      },
      onError: (_error: any, _shorts: any, context: any) => {
        queryClient.setQueryData('shorts', context.previousShorts)
      },
      onSettled: () => {
        queryClient.invalidateQueries('shorts')
      }
    })
}
