//PRINCIPAL
import {
    Alert,
} from 'react-native';
//STORES
import {
    indexStore,
    getFinancialOverviewStore
} from '../store';
import {
    indexStore as userDataStore,
} from '../../userData/store';
import {
    navigateStore
} from '../../../main/store';
//ACTIONS
import {
    GET_FINANCIAL_OVERVIEW,
    NAVIGATE,
    OPEN_MODAL,
    UPDATE_DIGITAL_BUSINESS_FINANCIAL_OVERVIEW_DATA,
    UPDATE_FORM
} from '../../../constants/action-types';
//FUNCTIONS
import { checkResponseErrors } from '../../../main/functions';

export function subscribeGetFinancialOverviewStore(operation) {
    const unsubscribe = getFinancialOverviewStore.subscribe(() => {
        if (checkResponseErrors(getFinancialOverviewStore.getState().getFinancialOverviewStatusState, GET_FINANCIAL_OVERVIEW)) return
        console.log('RECEIVING GET FINANCIAL OVERVIEW');
        indexStore.dispatch({ type: UPDATE_DIGITAL_BUSINESS_FINANCIAL_OVERVIEW_DATA, payload: getFinancialOverviewStore.getState().getFinancialOverviewState });
        switch (operation) {
            case 'USER_DATA':
                userDataStore.dispatch(
                    {
                        type: UPDATE_FORM,
                        payload:
                        {
                            name: 'digitalBusiness',
                            value: getFinancialOverviewStore.getState().getFinancialOverviewState,
                            type: 'DIGITAL_BUSINESS'
                        }
                    }
                )
                break
        }
    })
    return unsubscribe;
}

