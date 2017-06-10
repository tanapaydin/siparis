'use strict';

import type {Action} from '../actions/types';
import { BUY_ITEM } from '../actions/market';

export type State = {
  itemId: string,
  itemTitle: string,
  itemDescription: string,
  itemPrice: any,
  itemThumbnail: string,
  itemCode: string,
  itemMarketQuantity: string,
}

const initialState = {
  itemId: '-1',
  itemTitle: 'item title',
  itemDescription: 'item description',
  itemPrice: {
    integerPart: '0',
    fractionalPart: '0'
  },
  itemThumbnail: '',
  itemCode: 'default PNR',
  itemMarketQuantity: '0'
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === BUY_ITEM) {
    return {
      ...state,
      itemId: action.item.itemId,
      itemTitle: action.item.itemTitle,
      itemDescription: action.item.itemDescription,
      itemPrice: {
        integerPart: action.item.itemPrice.integerPart,
        fractionalPart: action.item.itemPrice.fractionalPart
      },
      itemThumbnail: action.item.itemThumbnail,
      itemCode: action.item.itemCode,
      itemMarketQuantity: action.item.itemMarketQuantity,
    };
  }

  return state;
}