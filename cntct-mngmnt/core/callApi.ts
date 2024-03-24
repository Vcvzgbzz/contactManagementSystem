interface CallApiProps<RequestType, ResponseType> {
  steps?: {
    onSuccess?: (data: ResponseType) => void;
    onFail?: (error: any) => void;
    onRequest?: () => void;
  };

  url: string;
  body?: RequestType;
  method?: "get" | "post" | "delete";
}

export async function callApi<RequestType, ResponseType>({
  steps,
  url,
  body,
  method,
}: CallApiProps<RequestType, ResponseType>) {
  if (steps?.onRequest) {
    steps.onRequest();
  }
  fetch(url, {
    method: method ? method : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data: ResponseType) => {
      if (steps?.onSuccess) {
        steps.onSuccess(data);
      }
    })
    .catch((error) => {
      if (steps?.onFail) {
        steps.onFail(error);
      }
    });
}
export default callApi;
