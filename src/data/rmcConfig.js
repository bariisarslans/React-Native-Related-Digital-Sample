import {Platform} from 'react-native'

import { addEventListener, removeEventListener, requestPermissions, EuroMessageApi, VisilabsApi } from 'react-native-related-digital'



export const appAlias = Platform.OS === "ios" ? "RelatedStoreIOS" : "RelatedStoreAndroid";
const siteId = "356467332F6533766975593D";
const organizationId = "676D325830564761676D453D";
const dataSource = "visistore";


// const appAlias = Platform.OS === "ios" ? "RelatedStoreIOS" : "RelatedAndroid";
// const siteId = "6E684172482F46763670553D";
// const organizationId = "516662522F74704A3143773D";
// const dataSource = "jimmykey";

export const euroMessageApi = new EuroMessageApi(appAlias);
export const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource);

export const AddEventListener =  addEventListener;
export const RequestPermissions = requestPermissions;

