import {Platform} from 'react-native'

import { addEventListener, removeEventListener, requestPermissions, EuroMessageApi, VisilabsApi } from 'react-native-related-digital'



const appAlias = Platform.OS === "ios" ? "RelatedStoreIOS" : "RelatedStoreAndroid";
const siteId = "356467332F6533766975593D";
const organizationId = "676D325830564761676D453D";
const dataSource = "visistore";

export const euroMessageApi = new EuroMessageApi(appAlias);
export const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource);

export const AddEventListener =  addEventListener;
export const RequestPermissions = requestPermissions;

