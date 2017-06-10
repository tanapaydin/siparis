'use strict';

import type { Action } from './types';

export const BUY_ITEM = "BUY_ITEM";

export function buyItem(item:any):Action {
  return {
    type: BUY_ITEM,
    item: item
  }
}