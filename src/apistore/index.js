import constant from './constant';

const callApi = (url, method) => {
    const header = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
     
      if (method === "GET") {
        return new Promise((resolve, reject) => {
          fetch(url, {
            method: method,
            headers: header
          })
            .then(res => res.json())
            .then(serverresponse => {
              resolve(serverresponse);
            })
            .catch(err => {
              console.log(err);
              resolve(err);
            });
        });
      }
}
export const fetchWeatherdetailApi = (payload) => {
    return new Promise((resolve, reject) => {
      const url = constant.BASE_URL_API_WEATHER +
        payload +
        constant.URL_API_WEATHER_KEY ;
      const data = callApi(url, "GET")
        .then(response => {
          if (response.cod === 200) {
            resolve(response);
          }
          else {
            reject(response);
          }
        },
          err => {
            console.log("fail");
          }
        );
    });
  };