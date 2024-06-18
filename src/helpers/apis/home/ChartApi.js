import BaseUrl, { catchApiError } from "./../BaseUrl";

export const FirstChartData = async () => {
    try {
        const res = await BaseUrl.get(`svenus_winloss/chart`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token_gasv')}` }
        });

        if (res.status === 200 && res?.data) {
            return res?.data
        }
    } catch (e) {
        catchApiError(e)
    }
}

export const SecondChartData = async (timestamp='today') => {
    try {
        const res = await BaseUrl.get(`/api/agent/chart/registeredUsersFirstDeposit?timestamp=${timestamp}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token_gasv')}` }
        });
        if (res.status === 200 && res?.data) {
            return res?.data
        }
    } catch (e) {
        catchApiError(e)
    }
}



export const ThirdChartdata = async (timestamp='today') => {
    try {
        const res = await BaseUrl.get(`/api/agent/chart/withdrawalDepositChart?timestamp=${timestamp}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token_gasv')}` }
        });
        
        if (res.status === 200 && res?.data) {
            return res?.data
        }
    } catch (e) {
        catchApiError(e)
    }
}

export const fourthChartdata = async (timestamp='today') => {
    try {
        const res = await BaseUrl.get(`/api/agent/chart/winLossChart?timestamp=${timestamp}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token_gasv')}` }
        });
        
        if (res.status === 200 && res?.data) {
            return res?.data
        }
    } catch (e) {
        catchApiError(e)
    }
}