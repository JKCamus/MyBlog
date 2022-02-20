/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-13 16:34:08
 * @LastEditors: camus
 * @LastEditTime: 2021-09-29 11:37:58
 */

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  PetSelected = 'PET_SELECTED',
  FetchPet = 'FETCH_PET',
  FetchPetSuccess = 'FETCH_PET_SUCCESS',
  Rest = 'RESET',
}

interface PetPayLoad {
  [Types.PetSelected]: string;
  [Types.FetchPet]: undefined;
  [Types.FetchPetSuccess]: Pet;
  [Types.Rest]: undefined;
}

interface Pet {
  name: string;
  voice: string;
  avatar: string;
}
const petsDB = {
  dogs: { name: 'Dogs', voice: 'Woof!', avatar: '🐶' },
  cats: { name: 'Cats', voice: 'Miauuu', avatar: '🐱' },
};

interface InitialState {
  loading: boolean;
  selectedPet: keyof typeof petsDB | '';
  petData: string[] | null;
}

export type PetActions = ActionMap<PetPayLoad>[keyof ActionMap<PetPayLoad>];

const getData = (type: keyof typeof petsDB): Promise<Pet> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(petsDB[type]);
    }, 2000);
  });
};

const initialState = { loading: false, selectedPet: '', petData: null };

const petsReducer = (state: any, action: PetActions) => {
  switch (action.type) {
    case Types.PetSelected: {
      return {
        ...state,
        selectedPet: action.payload,
      };
    }
    case Types.FetchPet: {
      return {
        ...state,
        loading: true,
        petData: null,
      };
    }
    case Types.FetchPetSuccess: {
      return {
        ...state,
        loading: false,
        petData: action.payload,
      };
    }

    case Types.Rest: {
      return initialState;
    }

    default:
      return ((e: never) => {
        throw new Error(e);
      })(action);
    // const exhaustiveCheck: never = action;
    // throw new Error(`Not supported action ${exhaustiveCheck}`);
  }
};

export { getData, petsReducer, initialState };
