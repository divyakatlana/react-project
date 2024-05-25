
import _ from 'lodash';

export const getIdfromUrl = (url) => {
    if (!!url && typeof url === 'string') {
      const arr = url?.split('/');
      if (arr?.length > 0) {
        const id = Number(arr[arr.length - 2]);
        return id;
      } 
    } 
    return 0;
  }

  export const checkValidId = (id) => {
    const parseId = Number(id || 0);
    if (isNaN(parseId) || parseId < 1) {
      return false;
    } else {
      return true;
    }
  }

  export const removeDuplicates = (arr) => {
    return arr?.length > 0
      ? _.uniqBy(arr, function (e) {
          return e.id;
        })
      : [];
  }

