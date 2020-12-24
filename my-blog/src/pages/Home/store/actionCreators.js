import * as actionTypes from "./constants";
import { getPhotoList } from "services/home";
import { message } from "antd";

export const changePhotosListAction = (photoList) => ({
  type: actionTypes.CHANGE_PHOTO_LIST,
  photoList,
});

export const getPhotosListAction = (page, size) => {
  return async (dispatch) => {
    try {
      await getPhotoList(page, size).then((res) => {
        const photoList = res.map((item) => {
          return {
            // src: `${item.url}${item.width===4?'':'?type=middle'}`,
            src: `${item.url}`,
            sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
            width: item.width,
            height: actionTypes.heightType[item.width],
          };
        });
        dispatch(changePhotosListAction(photoList));
      });
    } catch (error) {
      message.error("图片请求失败！");
    }
  };
};
